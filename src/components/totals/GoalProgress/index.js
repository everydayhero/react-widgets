"use strict";

var _         = require('lodash');
var React     = require('react');
var campaigns = require('../../../api/campaigns');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  displayName: "GoalProgress",
  propTypes: {
    goal: React.PropTypes.number,
    campaignUid: React.PropTypes.string.isRequired,
    progressColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    currencySymbol: React.PropTypes.string,
    format: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      goal: 0,
      campaignUid: '',
      progressColor: '#346fa3',
      textColor: '#FFFFFF',
      currencySymbol: '$',
      format: '0,0'
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  componentWillMount: function() {
    this.loadCampaignGoal();
  },

  loadCampaignGoal: function() {
    this.setState({ isLoading: true });
    campaigns.find(this.props.campaignUid, this.onSuccess);
  },

  onSuccess: function(result) {
    var campaign = result.campaign;
    var total = campaign.funds_raised.cents;

    this.setState({
      isLoading: false,
      total: total
    });
  },

  renderProgressBar: function() {
    var total = this.state.total;
    var goal = this.props.goal;
    var offsetWidth = numeral(total / goal).format('0%');
    var style = { width: offsetWidth || '100%' };
    var classes = 'GoalProgress__bar--completed';

    if (offsetWidth == '100%') {
      classes += '--completed';
    }

    if (this.state.isLoading) {
      return <Icon className="GoalProgress__loading" icon="refresh" />;
    } else {
      return (
        <div className={ classes } >
          <div className="GoalProgress__barTable" style={ style }>
            <div className="GoalProgress__barFill"></div>
            <div className="GoalProgress__barChevron"></div>
          </div>
        </div>
      );
    }
  },

  renderIcon: function() {
    return(
      <div className="GoalProgress__icon">
        <Icon icon="trophy"/>
      </div>
    );
  },

  renderText: function() {
    var props = this.props,
        format = props.format,
        goal = props.goal / 100,
        currencySymbol = props.currencySymbol;
    var total = this.state.total / 100;
    var formattedGoal = currencySymbol + numeral(goal).format(format) + ' goal';
    var formattedTotal = currencySymbol + numeral(total).format(format);

    return (
      <p className="GoalProgress__text">
        { formattedTotal }
        <span className="GoalProgress__text--raised"> raised of </span>
        { formattedGoal}
      </p>
    );
  },

  render: function() {
    var customStyle = {
      color: this.props.textColor
    };

    return (
      <div className="GoalProgress" style={ customStyle }>
        <div className="GoalProgress__area">
          { this.renderProgressBar() }
          { this.renderText() }
        </div>
        { this.renderIcon() }
      </div>
    );
  }
});
