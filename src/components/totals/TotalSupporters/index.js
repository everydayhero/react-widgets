'use strict';

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages     = require('../../../api/pages');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  displayName: 'TotalSupporters',
  mixins: [I18nMixin],
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
    pageCount: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    groupValue: React.PropTypes.string,
    groupValues: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      campaignUids: [],
      charityUid: '',
      charityUids: [],
      groupValue: '',
      groupValues: [],
      pageCount: 1,
      pageSize: 1,
      pageType: 'individual',
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0',
      searchTerm: '',
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
      total: this.state.total + result.meta.pagination.count
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

  setGroupValues: function() {
    var groupValues = [];

    if (this.props.groupValue) {
      groupValues.push(this.props.groupValue);
    } else {
      groupValues = this.props.groupValues;
    }

    return groupValues;
  },

  loadPages: function() {
    this.setState({ isLoading: true });

    var props = this.props;

    pages.search({
      campaignUid: this.setCampaignUids(),
      charityUid: this.setCharityUids(),
      groupValue: this.setGroupValues(),
      pageSize: 1,
      page: 1,
      searchTerm: props.searchTerm
    }, this.onSuccess);
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
      renderIcon = 'user';
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
