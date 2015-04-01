"use strict";

var React        = require('react');
var campaigns    = require('../../../api/campaigns');
var charities    = require('../../../api/charities');
var GoalProgress = require('../GoalProgress');

module.exports = React.createClass({
  displayName: 'EntityGoalProgress',

  propTypes: {
    campaignUid: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    fallbackToFundsRaised: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      isLoading: true
    };
  },

  componentWillMount: function() {
    this.loadData();
  },

  loadData: function() {
    if (this.props.campaignUid) {
      return campaigns.find(this.props.campaignUid, this.onSuccess);
    } else {
      return charities.find(this.props.charityUid, this.onSuccess);
    }
  },

  onSuccess: function(res) {
    var entity = this.props.campaignUid ? 'campaign' : 'charity';
    var data = res[entity];
    var funds_raised = data.funds_raised;

    this.setState({
      isLoading: false,
      total: funds_raised.cents || 0,
      goal: data.goal,
      currencySymbol: funds_raised.currency.symbol
    });
  },

  render: function() {
    var props = this.props;

    if (this.state.isLoading) { return false; }

    return (
      <GoalProgress
        total={ this.state.total }
        goal={ this.props.goal || this.state.goal }
        fallbackToFundsRaised={ props.fallbackToFundsRaised }
        currencySymbol={ this.state.currencySymbol } />
    );
  }
});
