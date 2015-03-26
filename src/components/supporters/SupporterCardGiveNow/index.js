"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');

module.exports = React.createClass({
  displayName: 'SupporterCardGiveNow',

  mixins: [I18nMixin],

  propTypes: {
    current: React.PropTypes.number.isRequired,
    target: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      current: 50,
      target: 100,
      url: '#',
      defaultI18n: {
        cta: 'Give Now',
        currency: '$',
        label: 'Only **{currency}{amount_remaining}** to go',
        achievedLabel: '**{currency}{amount_raised}** raised so far'
      }
    };
  },

  getLabel: function () {
    var props = this.props;

    return this.tm(props.current >= props.target ? 'achievedLabel' : 'label', {
      currency: this.t('currency'),
      amount_raised: parseFloat(props.current.toFixed(2)),
      amount_remaining: parseFloat((props.target - props.current).toFixed(2))
    });
  },

  render: function() {
    var t = this.t;
    var props = this.props;
    var progress = props.target > 0 ? Math.floor(props.current / props.target * 100) : 0;

    return (
      <a href={ props.url } className="SupporterCardGiveNow">
        <div className="SupporterCardGiveNow__cta">{ t('cta') }</div>
        <div className="SupporterCardGiveNow__progress">
          <div className="SupporterCardGiveNow__current" style={{ width: Math.min(progress, 100) + '%' }}></div>
          <div className="SupporterCardGiveNow__label">{ this.getLabel() }</div>
        </div>
      </a>
    );
  }
});
