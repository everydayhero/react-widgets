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
    campaignUids: React.PropTypes.array,
    pageCount: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUids: [],
      pageCount: 1,
      pageSize: 1,
      pageType: 'user',
      renderIcon: true,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
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
    this.setState({
      isLoading: true
    });

    var props = this.props;

    _.each(props.campaignUids, function(campaignUid) {
      pages.findByCampaign(campaignUid, props.pageCount, props.pageSize, props.pageType, this.onSuccess);
    }, this);
  },

  renderTotal: function() {
    var totalHeroes = this.state.total;
    var formattedTotal = numeral(totalHeroes).format('0,0');
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
