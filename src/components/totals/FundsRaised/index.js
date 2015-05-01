"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var totals    = require('../../../api/totals');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "FundsRaised",
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    pageId: React.PropTypes.string,
    offset: React.PropTypes.number,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      campaignUids: [],
      pageId: '',
      offset: 0,
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0.00 a',
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

  componentWillMount: function() {
    this.loadTotals();
  },

  setUids: function() {
    var campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  loadTotals: function() {
    this.setState({ isLoading: true });

    if (this.props.pageId && (this.props.campaignUid || this.props.campaignUids.length>0)) {
      console.log('Please specify either a pageId or a campaignUid (not both).');
    } else if (this.props.pageId) {
      totals.findByPage(this.props.pageId, this.onSuccess);
    } else {
      var campaignUids = this.setUids();

      for (var i=0; i<campaignUids.length; i++) {
        if (i==(campaignUids.length-1)) {
          totals.findByCampaign(campaignUids[i], this.onSuccess);
        } else {
          totals.findByCampaign(campaignUids[i], this.onSuccessSum);
        }
      }
    }
  },

  onSuccessSum: function(result) {
    this.setState({total: this.state.total + result.total_amount_cents.sum});
  },

  onSuccess: function(result) {
    this.setState({total: this.state.total + result.total_amount_cents.sum, isLoading: false});
  },

  renderTotal: function() {
    var symbol = this.t('symbol');
    var totalDollars = (this.state.total + this.props.offset) / 100;
    var formattedTotal = symbol + numeral(totalDollars).format(this.props.format);
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
