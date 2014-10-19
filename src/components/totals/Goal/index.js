/** @jsx React.DOM */
"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Goal",
  propTypes: {
    campaignUid: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      defaultI18n: {
        title: 'Goal',
        symbol: '$',
        goal: '0'
      }
    }
  },

  renderTotal: function() {
    var title = this.t('title');
    var symbol = this.t('symbol');
    var goal = this.t('goal');
    var formattedTotal = symbol + numeral(goal).format('0[.]00 a');

    return (
      <div>
        <div className="Goal__total">{ formattedTotal }</div>
        <div className="Goal__title">{ title }</div>
      </div>
    )
  },

  render: function() {
    return (
      <div className={ "Goal" }>
        { this.renderTotal() }
      </div>
    );
  }
});
