import React from 'react';
import totals from '../../../api/totals';
import GoalProgress from '../GoalProgress';
import I18nMixin from '../../mixins/I18n';
import numeral from 'numbro';

export default React.createClass({
  displayName: 'EntityGoalProgress',
  mixins: [I18nMixin],

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
    offset: React.PropTypes.number,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      goal: null,
      offset: 0,
      startAt: null,
      endAt: null,
      onLoad: function() {},
      format: '0,0',
      defaultI18n: {
        symbol: '$',
        goal_text: '**{total}** raised of **{goal}** goal',
        no_goal_text: '**{total}** raised'
      }
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

    if (this.props.campaignUid && this.props.charityUid) {
      return totals.findByAll({
        campaignUids: props.campaignUid,
        charityUids: props.charityUid
      }, this.onSuccess, options);
    } else if (this.props.campaignUid) {
      return totals.findByCampaigns({campaignUids: props.campaignUid}, this.onSuccess, options);
    } else if (this.props.charityUid) {
      return totals.findByCharities({charityUids: props.charityUid}, this.onSuccess, options);
    }
  },

  onSuccess: function(res) {
    this.setState({
      isLoading: false,
      total: res.total_amount_cents.sum ? res.total_amount_cents.sum + this.props.offset : 0,
      goal: res.goal
    });

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(res);
    }
  },

  formatCurrency: function(cents) {
    return this.t('symbol') + numeral(cents / 100).format(this.props.format);
  },

  getText: function() {
    var goal = this.props.goal || this.state.goal;

    return this.tm(goal > 0 ? 'goal_text' : 'no_goal_text', {
      total: this.formatCurrency(this.state.total),
      goal: this.formatCurrency(goal),
      remainder: this.formatCurrency(goal - this.state.total)
    });
  },

  render: function() {
    if (this.state.isLoading) { return false; }

    return (
      <GoalProgress
        total={ this.state.total }
        goal={ this.props.goal || this.state.goal }
        format={ this.props.format }
        text={ this.getText() } />
    );
  }
});
