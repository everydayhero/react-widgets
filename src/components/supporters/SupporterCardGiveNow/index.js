"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');

module.exports = React.createClass({
  displayName: 'SupporterCardGiveNow',

  mixins: [I18nMixin],

  propTypes: {
    current: React.PropTypes.number,
    target: React.PropTypes.number,
    url: React.PropTypes.string,
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
        label: 'Only {currency}{amount_remaining} to go'
      }
    };
  },

  render: function() {
    var props = this.props;
    var t = this.t;
    var label = t('label', {
      currency: t('currency'),
      amount_remaining: props.target - props.current
    });
    var progress = props.target > 0 ? Math.floor(props.current / props.target * 100) : 0;

    return (
      <a href={ props.url } className="SupporterCardGiveNow">
        <div className="SupporterCardGiveNow__cta">{ t('cta') }</div>
        <div className="SupporterCardGiveNow__progress">
          <div className="SupporterCardGiveNow__current" style={{ width: Math.min(progress, 100) + '%' }}></div>
          <div className="SupporterCardGiveNow__label">{ label }</div>
        </div>
      </a>
    );
  }
});
