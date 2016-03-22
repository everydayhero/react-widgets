'use strict';

var React              = require('react');
var moment             = require('moment');
var numeral            = require('numbro');
var I18nMixin          = require('../../mixins/I18n');
var CallToActionButton = require('../../callstoaction/CallToActionButton');

module.exports = React.createClass({
  displayName: 'CountDown',
  mixins: [I18nMixin],
  propTypes: {
    date: React.PropTypes.string.isRequired,
    linkUrl: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      date: null,
      linkUrl: null,
      format: '0,0',
      defaultI18n: {
        link_text: 'Register',
        finished: "This event has now finished.",
        past_tense: {
          one: "day ago",
          other: "days ago"
        },
        future_tense: {
          one: "day to go",
          other: "days to go"
        }
      }
    };
  },

  renderLink: function(isFinished) {
    var linkUrl = this.props.linkUrl;

    if (linkUrl && !isFinished) {
      return (
        <CallToActionButton href={ linkUrl } kind="primary" thin={ true } className="CountDown__link">
          { this.t('link_text') }
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
    var props        = this.props;
    var today        = moment().startOf('day');
    var eventDay     = moment(props.date, "YYYY-MM-DD");
    var days         = Math.ceil(eventDay.diff(today, 'days', true));
    var isFinished   = days < 0;
    var daysAbsolute = Math.abs(days);
    var label        = this.t(isFinished ? 'past_tense' : 'future_tense', { count: daysAbsolute });

    return (
      <div className="CountDown">
        <div className="CountDown__days">
          { numeral(daysAbsolute).format(props.format) }
        </div>
        <div className="CountDown__label">
          { label }
        </div>
        { this.renderLink(isFinished) }
      </div>
    );
  }
});
