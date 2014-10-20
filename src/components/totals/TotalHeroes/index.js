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
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
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

  	pages.find(this.props.campaignUid, this.onSuccess);
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
    return (
	    <div className={ "TotalHeroes" }>
        { this.renderIcon() }
        { this.renderTotal() }
	    </div>
    );
  }
});
