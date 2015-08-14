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
    pageIds: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string,
    offset: React.PropTypes.number,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: null,
      campaignUids: null,
      pageId: null,
      pageIds: null,
      charityUid: null,
      charityUids: null,
      startAt: null,
      endAt: null,
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

  loadTotals: function() {
    this.setState({ isLoading: true });

    var props        = this.props;
    var campaignUids = props.campaignUid || props.campaignUids;
    var charityUids  = props.charityUid || props.charityUids;
    var pageIds      = props.pageId || props.pageIds;

    var options = {};

    if (props.startAt) {
      options.start = props.startAt;
    }

    if (props.endAt) {
      options.end = props.endAt;
    }

    if (pageIds) {
      totals.findByPages(pageIds, this.onSuccess, options);
    } else if (charityUids) {
      totals.findByCharities(charityUids, this.onSuccess, options);
    } else if (campaignUids) {
      totals.findByCampaigns(campaignUids, this.onSuccess, options);
    }
  },

  onSuccess: function(result) {
    this.setState({
      total: this.state.total + result.total_amount_cents.sum,
      isLoading: false
    });
  },

  renderTotal: function() {
    var symbol         = this.t('symbol');
    var totalDollars   = (this.state.total + this.props.offset) / 100;
    var formattedTotal = symbol + numeral(totalDollars).format(this.props.format);
    var title          = this.t('title');

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

    if (renderIcon === true) {
      renderIcon = "money";
    }

    if (renderIcon) {
      return <Icon className="FundsRaised__icon" icon={ renderIcon } />;
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
