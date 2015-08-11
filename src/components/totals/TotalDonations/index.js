"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var totals    = require('../../../api/totals');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalDonations",
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
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
      charityUid: null,
      charityUids: null,
      renderIcon: true,
      backgroundColor: '',
      textColor: '',
      format: '0,0',
      defaultI18n: {
        title: 'Donations'
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
      total: this.state.total + result.total_amount_cents.count
    });
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

    var props        = this.props;
    var campaignUids = this.props.campaignUid || this.props.campaignUids;
    var charityUids  = props.charityUids;

    if (campaignUids) {
      totals.findByCampaigns(campaignUids, this.onSuccess);
    } else if (charityUids)  {
      totals.findByCharities(charityUids, this.onSuccess);
      // console.log(charityUids);
    }
  },

  renderTotal: function() {
    var totalDonations = this.state.total;
    var formattedTotal = numeral(totalDonations).format(this.props.format);
    var title          = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalDonations__loading" icon="refresh" />;
    }

    return (
      <div>
        <div className="TotalDonations__total">{ formattedTotal }</div>
        <div className="TotalDonations__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = "life-saver";
    }

    if (renderIcon) {
      return <Icon className="TotalDonations__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TotalDonations" style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
