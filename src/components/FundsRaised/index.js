/** @jsx React.DOM */
"use strict";

var React     = require('react');
var I18nMixin = require('../mixins/I18n');
var campaigns	= require('../../api/campaigns');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "FundsRaised",
  propTypes: {
    campaignUid: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      defaultI18n: {
        title: 'Raised To Date',
        symbol: '$'
      }
    }
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

  renderTotal: function(){
    var symbol = this.t('symbol');
    var totalDollars = this.state.total/100;
    var formattedTotal = symbol + numeral(totalDollars).format('0.00 a');

    if(this.state.isLoading) {
      return <div className="FundsRaised__loading">Loading...</div>
    } else {
      return <div className="FundsRaised__total">{ formattedTotal }</div>
    }
  },

  render: function() {
    var title = this.t('title');

    return (
	    <div className={ "FundsRaised" }>
        { this.renderTotal() }
        <div className="FundsRaised__title">{ title }</div>
	    </div>
    );
  }
});