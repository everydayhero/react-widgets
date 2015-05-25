"use strict";

var React        = require('react');
var totals       = require('../../../api/totals');
var GoalProgress = require('../GoalProgress');

module.exports = React.createClass({
  displayName: 'EntityGoalProgress',

  propTypes: {
    campaignUid: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    charityUid: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    goal: React.PropTypes.number
  },

  getDefaultProps: function() {
    return { goal: null };
  },

  getInitialState: function() {
    return { isLoading: true };
  },

  componentWillMount: function() {
    this.loadTotals();
  },

  loadTotals: function() {
    if (this.props.campaignUid) {
      return totals.findByCampaigns(this.props.campaignUid, this.onSuccess);
    } else if (this.props.charityUid) {
      return totals.findByCharities(this.props.charityUid, this.onSuccess);
    }
  },

  onSuccess: function(res) {
    this.setState({
      isLoading: false,
      total: res.total_amount_cents.sum || 0,
      goal: res.goal
    });
  },

  render: function() {
    if (this.state.isLoading) { return false; }

    return (
      <GoalProgress
        total={ this.state.total }
        goal={ this.props.goal || this.state.goal }
        currencySymbol={ this.state.currencySymbol } />
    );
  }
});
