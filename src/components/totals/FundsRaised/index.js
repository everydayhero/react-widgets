"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var campaigns = require('../../../api/campaigns');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "FundsRaised",
  propTypes: {
    campaignUid: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      defaultI18n: {
        title: 'Raised To Date',
        symbol: '$'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      total: result.campaign.funds_raised.cents
    });
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    campaigns.find(this.props.campaignUid, this.onSuccess);
  },

  renderTotal: function() {
    var symbol = this.t('symbol');
    var totalDollars = this.state.total / 100;
    var formattedTotal = symbol + numeral(totalDollars).format('0.00 a');
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="FundsRaised__loading" icon="refresh" />;
    } else {
      return (
        <div>
          <div className="FundsRaised__total">{ formattedTotal }</div>
          <div className="FundsRaised__title">{ title }</div>
        </div>
      );
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return <Icon className="FundsRaised__icon" icon="money"/>;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "FundsRaised" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
