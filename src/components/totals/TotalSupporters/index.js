"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages     = require('../../../api/pages');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalSupporters",
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string,
    pageCount: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      campaignUids: [],
      charityUid: '',
      charityUids: [],
      startAt: null,
      endAt: null,
      pageCount: 1,
      pageSize: 1,
      pageType: 'individual',
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0',
      defaultI18n: {
        title: 'Supporters'
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
      total: this.state.total + result.meta.count
    });
  },

  componentWillMount: function() {
    this.loadPages();
  },

  setCampaignUids: function() {
    var campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  setCharityUids: function() {
    var charityUids = [];

    if (this.props.charityUid) {
      charityUids.push(this.props.charityUid);
    } else {
      charityUids = this.props.charityUids;
    }

    return charityUids;
  },

  loadPages: function() {
    this.setState({ isLoading: true });

    var campaignUids = this.setCampaignUids();
    var props = this.props;
    var charityUids  = this.setCharityUids();

    var options = {};

    if (props.startAt) {
      options.start = props.startAt;
    }

    if (props.endAt) {
      options.end = props.endAt;
    }

    if (campaignUids.length > 0) {
      _.each(campaignUids, function(campaignUid) {
        pages.findByCampaign(campaignUid, props.pageType, props.pageCount, props.pageSize, this.onSuccess, options);
      }, this);
    } else if (charityUids.length > 0) {
      _.each(charityUids, function(charityUid) {
        pages.findByCharity(charityUid, props.pageType, props.pageCount, props.pageSize, this.onSuccess, options);
      }, this);
    }
  },

  renderTotal: function() {
    var totalSupporters = this.state.total;
    var formattedTotal = numeral(totalSupporters).format(this.props.format);
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalSupporters__loading" icon="refresh" />;
    }

    return (
      <div>
        <div className="TotalSupporters__total">{ formattedTotal }</div>
        <div className="TotalSupporters__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = "user";
    }

    if (renderIcon) {
      return <Icon className="TotalSupporters__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TotalSupporters" style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
