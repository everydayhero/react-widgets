"use strict";

var _                         = require('lodash');
var React                     = require('react');
var I18nMixin                 = require('../../mixins/I18n');
var campaigns                 = require('../../../api/campaigns');
var charities                 = require('../../../api/charities');
var Icon                      = require('../../helpers/Icon');
var FitnessLeaderboardItem    = require('../FitnessLeaderboardItem');
var FitnessLeaderboardColHead = require('../FitnessLeaderboardColHead');
var numeral                   = require('numeral');
var METERS_TO_MILES           = 0.000621371192;

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "FitnessLeaderboard",
  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'nz', 'uk', 'us']),
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    unit: React.PropTypes.oneOf(['km', 'miles']),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    initialSort: React.PropTypes.oneOf(['amount', 'distance']),
    currencyFormat: React.PropTypes.string,
    distanceFormat: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      type: 'individual',
      limit: 100,
      pageSize: 5,
      unit: 'miles',
      backgroundColor: '',
      textColor: '',
      initialSort: 'distance',
      currencyFormat: '0,0[.]00 a',
      distanceFormat: '0,0[.]00',
      defaultI18n: {
        raisedTitle: 'Raised',
        distanceTitle: 'Distance',
        symbol: '$',
        heading: 'Top Individuals',
        kmSuffix: 'km',
        milesSuffix: 'mi'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      boardData: [],
      currentSort: this.props.initialSort
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard();
  },

  getEndpoint: function() {
    var endpoint;

    var props = this.props;
    if (props.country) {
      if (props.campaignSlug) { endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug); }
      if (props.charitySlug)  { endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug); }
    } else {
      if (props.campaignUid)  { endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid); }
      if (props.charityUid)   { endpoint = charities.leaderboard.bind(charities, props.charityUid); }
    }

    if (!endpoint && console && console.log) {
      console.log("FitnessLeaderboard widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadLeaderboard: function() {
    this.setState({ isLoading: true });

    var endpoint = this.getEndpoint();
    endpoint(this.props.type, this.props.limit, this.processLeaderboard, { includePages: true });
  },

  processLeaderboard: function(result) {
    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];
    var leaderboard = _.map(pages, this.processPage);

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
      return numeral(meters / 1000).format(this.props.distanceFormat) + ' ' + this.t('kmSuffix');
    } else {
      return numeral(meters * METERS_TO_MILES).format(this.props.distanceFormat) + ' ' + this.t('milesSuffix');
    }
  },

  formatAmount: function(amount) {
    return this.t('symbol') + numeral(amount / 100).format(this.props.currencyFormat);
  },

  renderLeaderboardItems: function() {
    var boardData = this.state.boardData;
    var symbol    = this.t('symbol');

    if (this.state.isLoading) {
      return (
        <tr>
          <td colSpan="3">
            <Icon className="FitnessLeaderboard__loading" icon="refresh" />
          </td>
        </tr>
      );
    }
    return _.map(boardData, function(d, i) {
      if (i < this.props.pageSize) {
        var formattedAmount = this.formatAmount(d.amount);
        var formattedMeters = this.formatDistance(d.distance);

        return (
          <FitnessLeaderboardItem
            key={ d.id }
            name={ d.name }
            url={ d.url }
            isoCode={ d.isoCode }
            amount={ formattedAmount }
            meters={ formattedMeters }
            imgSrc={ d.imgSrc } />
        );
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
      <div className="FitnessLeaderboard" style={ customStyle }>
        <div className="FitnessLeaderboard__heading">
          { heading }
        </div>
        <table className="FitnessLeaderboard__table">
          <thead>
            <tr>
              <FitnessLeaderboardColHead name="Fundraiser" />
              <FitnessLeaderboardColHead name={ raisedTitle } sort="amount" onClick={ this.sortLeaderboard } active={ this.state.currentSort === "amount" } />
              <FitnessLeaderboardColHead name={ distanceTitle } sort="distance" onClick={ this.sortLeaderboard } active={ this.state.currentSort === "distance" } />
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
