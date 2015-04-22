'use strict';

var React              = require('react');
var moment             = require('moment');
var numeral            = require('numeral');
var I18nMixin          = require('../../mixins/I18n');
var CallToActionButton = require('../../callstoaction/CallToActionButton');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: 'CountDown',
  propTypes: {
    date: React.PropTypes.string.isRequired,
    linkUrl: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      date: null,
      days: 0,
      linkUrl: null,
      format: '0,0',
      defaultI18n: {
        linkText: 'Register',
        finished: "This event has now finished.",
        days: "days",
        day: "day",
        ago: "ago",
        toGo: "to go"
      }
    };
  },

  renderLink: function(isFinished) {
    var linkUrl = this.props.linkUrl;

    if (linkUrl && !isFinished) {
      return (
        <CallToActionButton href={ linkUrl } kind="primary" thin="true" className="CountDown__link">
          { this.t('linkText') }
        </CallToActionButton>
      );
    } else if (linkUrl && isFinished) {
      return (
        <div className="CountDown__finished">
          { this.t('finished') }
        </div>
      );
    }
  },

  render: function() {
    var props       = this.props;
    var today       = moment().startOf('day');
    var eventDay    = moment(props.date, ["DD-MM-YYYY", "MM-DD-YYYY"]);
    var days        = Math.ceil(eventDay.diff(today, 'days', true));
    var timeLabel   = this.t('days');
    var suffixLabel = this.t('toGo');
    var isFinished  = false;

    if (days === 1 || days === -1) {
      timeLabel = this.t('day');
    }

    if (days < 0) {
      days *= -1;
      isFinished = true;
      suffixLabel = this.t('ago');
    }

    return (
      <div className="CountDown">
        <div className="CountDown__days">
          { numeral(days).format(this.props.format) }
        </div>
        <div className="CountDown__label">
          { timeLabel + ' ' + suffixLabel }
        </div>
        { this.renderLink(isFinished) }
      </div>
    );
  }
});
