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
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    handleCents: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      goal: 0,
      backgroundColor: null,
      textColor: null,
      format: '0[.]00 a',
      handleCents: true,
      defaultI18n: {
        title: 'Goal',
        symbol: '$',
        suffix: ''
      }
    };
  },

  renderTotal: function() {
    var title  = this.t('title');
    var symbol = this.t('symbol');
    var suffix = this.t('suffix');
    var goal   = this.props.goal;

    if (this.props.handleCents) goal = goal / 100;

    var formattedTotal = symbol + numeral(goal).format(this.props.format);

    return (
      <div>
        <div className="Goal__total">{ formattedTotal + suffix }</div>
        <div className="Goal__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = "dollar";
    }

    if (renderIcon) {
      return <Icon className="Goal__icon" icon={ renderIcon } />;
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
