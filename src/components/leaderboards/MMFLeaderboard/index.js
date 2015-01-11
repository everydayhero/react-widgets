"use strict";

var _                     = require('lodash');
var React                 = require('react');
var I18nMixin             = require('../../mixins/I18n');
var leaderboard           = require('../../../api/leaderboard');
var pages                 = require('../../../api/pages');
var Icon                  = require('../../helpers/Icon');
var MMFLeaderboardItem    = require('../MMFLeaderboardItem');
var MMFLeaderboardColHead = require('../MMFLeaderboardColHead');
var numeral               = require('numeral');
var METERS_TO_MILES       = 0.000621371192;

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "MMFLeaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    unit: React.PropTypes.oneOf(['km', 'miles']),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    initialSort: React.PropTypes.oneOf(['amount', 'distance']),
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: 100,
      pageSize: 5,
      unit: 'miles',
      backgroundColor: '',
      textColor: '',
      initialSort: 'distance',
      defaultI18n: {
        raisedTitle: 'Raised',
        distanceTitle: 'Distance',
        symbol: '$',
        heading: 'Top Individuals'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      pageIds: [],
      boardData: [],
      currentSort: this.props.initialSort
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard();
  },

  loadLeaderboard: function() {
    this.setState({ isLoading: true });

    var props = this.props;
    leaderboard.find(props.campaignUid, props.type, props.limit, this.loadPages);
  },

  loadPages: function(result) {
    var pageIds = result.leaderboard.page_ids;
    this.setState({ pageIds: pageIds });

    pages.findByIds(pageIds, this.processLeaderboard);
  },

  processLeaderboard: function(pageData) {
    var leaderboard = _.map(this.state.pageIds, function(pageId, i) {
      var page = _.find(pageData.pages, {id: pageId});
      return this.processPage(page);
    }, this);

    this.setState({
      isLoading: false,
      boardData: leaderboard
    });

    this.sortLeaderboard(this.props.initialSort);
  },

  processPage: function(page) {
    return {
      id: page.id,
      name: page.name,
      url: page.url,
      isoCode: page.amount.currency.iso_code,
      amount: page.amount.cents,
      imgSrc: page.image.small_image_url,
      distance: this.combineActivityData(page.fitness_activity_overview)
    };
  },

  combineActivityData: function(fitnessActivity) {
    return _.reduce(fitnessActivity, function(sum, n) {
      return sum += n.distance_in_meters;
    }, 0);
  },

  sortLeaderboard: function(sortField) {
    this.setState({
      boardData: _.sortBy(this.state.boardData, [sortField, 'amount']).reverse(),
      currentSort: sortField
    });
  },

  formatDistance: function(meters) {
    if (this.props.unit === 'km') {
      return numeral(meters / 1000).format('0,0[.]00') + ' km';
    } else {
      return numeral(meters * METERS_TO_MILES).format('0,0[.]00') + ' mi.';
    }
  },

  renderLeaderboardItems: function() {
    var boardData = this.state.boardData;
    var symbol    = this.t('symbol');

    if (this.state.isLoading) {
      return (
        <tr>
          <td colSpan="3">
            <Icon className="MMFLeaderboard__loading" icon="refresh" />
          </td>
        </tr>
      );
    }
    return _.map(boardData, function(d, i) {
      if (i < this.props.pageSize) {
        var formattedAmount = symbol + numeral(d.amount / 100).format('0[.]00 a');
        var formattedMeters = this.formatDistance(d.distance);

        return (
          <MMFLeaderboardItem
            key={ d.id }
            name={ d.name }
            url={ d.url }
            isoCode={ d.isoCode }
            amount={ formattedAmount }
            meters={ formattedMeters }
            imgSrc={ d.imgSrc } />
        );
      } else {
        return;
      }
    }, this);
  },

  render: function() {
    var limit           = this.props.limit;
    var heading         = this.t('heading');
    var raisedTitle     = this.t('raisedTitle');
    var distanceTitle   = this.t('distanceTitle');
    var backgroundColor = this.props.backgroundColor;
    var textColor       = this.props.textColor;

    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="MMFLeaderboard" style={ customStyle }>
        <div className="MMFLeaderboard__heading">
          { heading }
        </div>
        <table className="MMFLeaderboard__table">
          <thead>
            <tr>
              <MMFLeaderboardColHead name="Fundraiser" />
              <MMFLeaderboardColHead name={ raisedTitle } sort="amount" onClick={ this.sortLeaderboard } active={ this.state.currentSort === "amount" } />
              <MMFLeaderboardColHead name={ distanceTitle } sort="distance" onClick={ this.sortLeaderboard } active={ this.state.currentSort === "distance" } />
            </tr>
          </thead>
          <tbody>
            { this.renderLeaderboardItems() }
          </tbody>
        </table>
      </div>
    );
  }
});
