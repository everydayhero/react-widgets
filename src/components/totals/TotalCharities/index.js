/** @jsx React.DOM */
"use strict";

var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var campaignCharities = require('../../../api/campaignCharities');
var Icon              = require('../../helpers/Icon');
var numeral           = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalCharities",
  propTypes: {
    campaignUid: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      defaultI18n: {
        title: 'Non Profits'
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

    campaignCharities.find(this.props.campaignUid, this.onSuccess);
  },

  renderTotal: function() {
    var totalCharities = this.state.total;
    var formattedTotal = numeral(totalCharities).format('0,0');
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalCharities__loading" icon="refresh" spin={ true }/>;
    } else {
      return (
        <div>
          <div className="TotalCharities__total">{ formattedTotal }</div>
          <div className="TotalCharities__title">{ title }</div>
        </div>
      )
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return (
        <Icon className="TotalCharities__icon" icon="heart"/>
      );
    }
  },

  render: function() {
    return (
      <div className={ "TotalCharities" }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
