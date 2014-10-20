/** @jsx React.DOM */
"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var leaderboard       = require('../../../api/leaderboard');
var leaderboardPages  = require('../../../api/leaderboardPages');
var Icon              = require('../../helpers/Icon');
var LeaderboardRow    = require('../LeaderboardRow')
var numeral           = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Leaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string,
    type: React.PropTypes.string,
    limit: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: '5',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members'
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

  gotTeamPages: function(result, callback) {
    this.setState({
      teamPageIds: result.leaderboard.page_ids
    });

    leaderboardPages.find(this.state.teamPageIds, this.getPageData);
  },

  getPageData: function(page_data) {
    var leaderboard = _.map(this.state.teamPageIds, function(page_id, i) {
      var page = _.filter(page_data.pages, {id: page_id})[0];

      return {
        name: page.name,
        iso_code: page.amount.currency.iso_code,
        amount: '$' + (page.amount.cents / 100)
      }
    });

    this.getShitDone(leaderboard);
  },

  getShitDone: function(data) {
    this.setState({
      isLoading: false,
      boardData: data
    });
  },

  renderLeaderboardRow: function() {
    if (this.state.boardData.length > 0) {
      return this.state.boardData.map(function(d,i) {
        return (
          <LeaderboardRow name={ d.name } iso_code={ d.iso_code } amount={ d.amount } />
        )
      }, this);
    }
  },

  render: function() {
    return (
      <div className={ "Leaderboard" }>
        { this.renderLeaderboardRow() }
      </div>
    );
  }
});
