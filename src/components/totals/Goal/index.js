"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Goal",
  propTypes: {
    goal: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      goal: 0,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      defaultI18n: {
        title: 'Goal',
        symbol: '$'
      }
    };
  },

  renderTotal: function() {
    var title = this.t('title');
    var symbol = this.t('symbol');
    var goal = this.props.goal / 100;
    var formattedTotal = symbol + numeral(goal).format('0[.]00 a');

    return (
      <div>
        <div className="Goal__total">{ formattedTotal }</div>
        <div className="Goal__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return (
        <Icon className="Goal__icon" icon="dollar"/>
      );
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="Goal" style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
