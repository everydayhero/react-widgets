"use strict";

var _                  = require('lodash');
var React              = require('react');
var I18nMixin          = require('../../mixins/I18n');
var leaderboard        = require('../../../api/leaderboard');
var pages              = require('../../../api/pages');
var Icon               = require('../../helpers/Icon');
var MMFLeaderboardItem = require('../MMFLeaderboardItem');
var numeral            = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "MMFLeaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: 50,
      pageSize: 50,
      backgroundColor: '',
      textColor: '',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        rankTitle: 'Ranked',
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
      pagedBoardData: [],
      currentPage: 1
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

    this.rankLeaderboard(leaderboard);

    this.setState({
      isLoading: false,
      boardData: leaderboard
    });
  },

  processPage: function(page) {
    if (page.fitness_activity_overview !== null) {
      var new_fitness_activity_overview = {
        distance_in_meters: 0
      };

      // Combines all fitness activity in to one rather than splitting by activity type.
      _.forOwn(page.fitness_activity_overview, function(num, key) {
        var fitness_activity_overview = page.fitness_activity_overview[key];
        new_fitness_activity_overview.distance_in_meters += fitness_activity_overview.distance_in_meters;
      });

      page.fitness_activity_overview = new_fitness_activity_overview;
    }

    return {
      id: page.id,
      name: page.name,
      url: page.url,
      isoCode: page.amount.currency.iso_code,
      amount:  page.amount.cents,
      totalMembers: page.team_member_uids.length,
      imgSrc: page.image.large_image_url,
      medImgSrc: page.image.medium_image_url,
      distance_in_meters: page.fitness_activity_overview.distance_in_meters
    };
  },

  rankLeaderboard: function(leaderboard) {
    var rank = 1;
    var prevItem = null;

    _.forEach(leaderboard, function(item, i) {
      if (prevItem && item.amount != prevItem.amount) {
        rank = i + 1;
      }

      item.rank = rank;
      prevItem = item;
    });
  },

  renderLeaderboardItems: function() {
    var boardData = this.state.boardData;
    var symbol    = this.t('symbol');

    if (this.state.isLoading) {
      return (
        <tr>
          <td>
            <Icon className="Leaderboard__loading" icon="refresh" />
          </td>
        </tr>
      );
    }

    return _.map(boardData, function(d, i) {
      var formattedAmount = symbol + numeral(d.amount / 100).format('0[.]00 a');
      var formattedMeters = d.distance_in_meters;
      var formattedRank = numeral(d.rank).format('0o');

      return (
        <MMFLeaderboardItem
          key={ d.id }
          rank={ formattedRank }
          rankTitle={ this.t('rankTitle') }
          name={ d.name }
          url={ d.url }
          isoCode={ d.isoCode }
          amount={ formattedAmount }
          meters={ formattedMeters }
          imgSrc={ d.medImgSrc } />
      );
    }, this);
  },

  renderIndicators: function() {
    if (!this.state.isLoading) {
      return _.map(this.state.boardData, function(d, i) {
        var iconClass;

        if (this.state.currentPage == i + 1) {
          iconClass = "circle";
        } else {
          iconClass = "circle-o";
        }

        return (
          <div key={ i } onClick={ this.switchPage.bind(null, i) } className="Leaderboard__indicator">
            <Icon className="Leaderboard__icon" icon={ iconClass } />
          </div>
        );
      }, this);
    }
  },

  sortLeaderboard: function(attr) {
    var sortedBoardData = _.sortBy(this.state.boardData, [attr, 'amount']).reverse();
    this.setState({ boardData: sortedBoardData });
  },

  render: function() {
    var limit       = this.props.limit;
    var pageSize    = this.props.pageSize;
    var heading     = this.t('heading');
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
              <td className="MMFLeaderboard__colhead MMFLeaderboard__colhead--fundraiser">Fundraiser</td>
              <td className="MMFLeaderboard__colhead MMFLeaderboard__colhead--raised" onClick={ this.sortLeaderboard.bind(null, 'amount') }>Raised</td>
              <td className="MMFLeaderboard__colhead MMFLeaderboard__colhead--distance" onClick={ this.sortLeaderboard.bind(null, 'distance_in_meters') }>Distance</td>
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
