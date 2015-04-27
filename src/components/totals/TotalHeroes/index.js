"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages     = require('../../../api/pages');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalHeroes",
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    pageCount: React.PropTypes.number,
    pageSize: React.PropTypes.number,
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
      pageCount: 1,
      pageSize: 1,
      pageType: 'individual',
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0',
      defaultI18n: {
        title: 'Heroes'
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

  setUids: function() {
    var campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  loadPages: function() {
    this.setState({ isLoading: true });

    var campaignUids = this.setUids();
    var props = this.props;

    _.each(campaignUids, function(campaignUid) {
      pages.findByCampaign(campaignUid, props.pageType, props.pageCount, props.pageSize, this.onSuccess);
    }, this);
  },

  renderTotal: function() {
    var totalHeroes = this.state.total;
    var formattedTotal = numeral(totalHeroes).format(this.props.format);
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalHeroes__loading" icon="refresh" />;
    }

    return (
      <div>
        <div className="TotalHeroes__total">{ formattedTotal }</div>
        <div className="TotalHeroes__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return <Icon className="TotalHeroes__icon" icon="bolt"/>;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TotalHeroes" style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
