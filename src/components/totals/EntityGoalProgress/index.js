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
    goal: React.PropTypes.number,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      goal: null,
      startAt: null,
      endAt: null
    };
  },

  getInitialState: function() {
    return { isLoading: true };
  },

  componentWillMount: function() {
    this.loadTotals();
  },

  loadTotals: function() {
    var props = this.props;

    var options = {};
    if (props.startAt) {
      options.start = props.startAt;
    }
    if (props.endAt) {
      options.end = props.endAt;
    }

    if (this.props.campaignUid) {
      return totals.findByCampaigns(props.campaignUid, this.onSuccess, options);
    } else if (this.props.charityUid) {
      return totals.findByCharities(props.charityUid, this.onSuccess, options);
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
