/** @jsx React.DOM */
"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages	    = require('../../../api/pages');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalHeroes",
  propTypes: {
    campaignUid: React.PropTypes.string,
    page_count: React.PropTypes.string,
    page_size: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      page_count: '1',
      page_size: '1',
      page_type: 'user',
      renderIcon: true,
      backgroundColor: '#555555',
      textColor: '#FFFFFF',
      defaultI18n: {
        title: 'Heroes'
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
      total: result.meta.pagination.count
    });
  },

  componentWillMount: function() {
  	this.setState({
      isLoading: true
  	});

    var props = this.props;

  	pages.find(props.campaignUid, props.page_count, props.page_size, props.page_type, this.onSuccess);
  },

  renderTotal: function() {
    var totalHeroes = this.state.total;
    var formattedTotal = numeral(totalHeroes).format('0,0');
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalHeroes__loading" icon="refresh" spin={ true }/>;
    } else {
      return (
        <div>
          <div className="TotalHeroes__total">{ formattedTotal }</div>
          <div className="TotalHeroes__title">{ title }</div>
        </div>
      )
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return (
        <Icon className="TotalHeroes__icon" icon="bolt"/>
      );
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
	    <div className={ "TotalHeroes" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
	    </div>
    );
  }
});
