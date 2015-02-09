"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');

module.exports = React.createClass({
  displayName: 'SupporterCardGiveNow',

  mixins: [I18nMixin],

  propTypes: {
    current: React.PropTypes.number,
    target: React.PropTypes.number,
    name: React.PropTypes.string,
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
        labelPre: 'Only',
        currency: '$',
        labelPost: 'to go'
      }
    };
  },

  render: function() {
    var props = this.props;
    var t = this.t;
    var label = [t('labelPre'), t('currency') + (props.target - props.current), t('labelPost')];
    var currentStyle = {
      width: (Math.min(props.current / props.target * 100, 100)) + '%'
    };

    return (
      <a href={ props.url } className="SupporterCardGiveNow">
        <div className="SupporterCardGiveNow__cta">{ t('cta') }</div>
        <div className="SupporterCardGiveNow__progress">
          <div className="SupporterCardGiveNow__current" style={ currentStyle }></div>
          <div className="SupporterCardGiveNow__label">{ label.join(' ') }</div>
        </div>
      </a>
    );
  }
});
