/** @jsx React.DOM */
"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages     = require('../../../api/leaderboard');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TopTeams",
  propTypes: {
    campaignUid: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members'
      }
    }
  },

  getInitialState: function() {
    return {
      isLoading: false,
      teamPageIds: []
    };
  },

  // Store all of ids we get back
  gotTeamPages: function(result) {
    this.setState({
      isLoading: false,
      teamPageIds: result.leaderboard.page_ids
    });


  },

  // Create leaderboard from returned pages
  createLeaderboard: function() {

  }

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    leaderboard.find(this.props.campaignUid, team, 12, this.gotTeamPages);
  },

  renderTotal: function() {
    var totalHeroes = this.state.total;
    var formattedTotal = numeral(totalHeroes).format('0,0');
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalHeroes__loading" icon="refresh" spin={ true }/>;
    } else {
      return (
        <div>
          <div className="TotalHeroes__total">{ formattedTotal }</div>
          <div className="TotalHeroes__title">{ title }</div>
        </div>
      )
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return (
        <Icon className="TotalHeroes__icon" icon="bolt"/>
      );
    }
  },

  render: function() {
    return (
      <div className={ "TotalHeroes" }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
