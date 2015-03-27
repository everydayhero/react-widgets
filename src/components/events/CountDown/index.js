'use strict';

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: 'CountDown',
  propTypes: {
    days: React.PropTypes.number.isRequired,
    linkUrl: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      days: 0,
      registerUrl: '',
      defaultI18n: {
        linkText: 'Get Started'
      }
    };
  },

  render: function() {
    var props = this.props;

    return (
      <div className="CountDown">
        <p className="CountDown__days">{ props.days }</p>
        <p className="CountDown__daysToGo">days to go</p>
        <a href={ props.linkUrl } className="CountDown__register">{ this.t('linkText') }</a>
      </div>
    );
  }
});
