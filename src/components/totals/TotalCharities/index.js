/** @jsx React.DOM */
"use strict";

var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var charities         = require('../../../api/charities');
var Icon              = require('../../helpers/Icon');
var numeral           = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalCharities",
  propTypes: {
    campaignUid: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      defaultI18n: {
        title: 'Non Profits'
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
      total: result.meta.count
    });
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });
    charities.findByCampaign(this.props.campaignUid, 1, 1, this.onSuccess);
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
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={ "TotalCharities" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
