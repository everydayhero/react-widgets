/** @jsx React.DOM */
"use strict";

var _                     = require('lodash');
var React                 = require('react');
var I18nMixin             = require('../../mixins/I18n');
var leaderboard           = require('../../../api/leaderboard');
var leaderboardPages      = require('../../../api/leaderboardPages');
var Icon                  = require('../../helpers/Icon');
var TeamLeaderboardItem   = require('../TeamLeaderboardItem')
var numeral               = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TeamLeaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string,
    type: React.PropTypes.string,
    limit: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'team',
      limit: '10',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        symbol: '$',
        heading: 'Leaderboard'
      }
    }
  },

  getInitialState: function() {
    return {
      isLoading: false,
      teamPageIds: [],
      boardData: []
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    leaderboard.find(props.campaignUid, props.type, props.limit, this.gotTeamPages);
  },

  gotTeamPages: function(result) {
    this.setState({
      teamPageIds: result.leaderboard.page_ids
    });

    leaderboardPages.find(this.state.teamPageIds, this.getPageData);
  },

  getPageData: function(page_data) {
    var symbol = this.t('symbol');

    var leaderboard = _.map(this.state.teamPageIds, function(page_id, i) {
      var page = _.filter(page_data.pages, {id: page_id})[0];

      return {
        name: page.name,
        iso_code: page.amount.currency.iso_code,
        amount:  symbol + numeral(page.amount.cents / 100).format('0[.]00 a'),
        totalMembers: page.team_member_uids.length
      }
    });

    this.onComplete(leaderboard);
  },

  onComplete: function(data) {
    this.setState({
      isLoading: false,
      boardData: data
    });
  },

  renderLeaderboardItems: function() {
    if (this.state.boardData.length > 0) {
      return this.state.boardData.map(function(d,i) {
        return (
          <TeamLeaderboardItem
            name={ d.name }
            iso_code={ d.iso_code }
            amount={ d.amount }
            totalMembers={ d.totalMembers }
            raisedTitle={ this.t('raisedTitle') }
            membersTitle={ this.t('membersTitle') } />
        )
      }, this);
    }
  },

  render: function() {
    var heading = this.t('heading');

    return (
      <div className="TeamLeaderboard">
        <h3 className="TeamLeaderboard__heading">{ heading }</h3>
        <ol className="TeamLeaderboard__items">
          { this.renderLeaderboardItems() }
        </ol>
      </div>
    );
  }
});
