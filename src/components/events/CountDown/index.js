'use strict';

var React = require('react');
var effect = require('../../../lib/effect');

module.exports = React.createClass({
  displayName: 'CountDown',
  propTypes: {
    days: React.PropTypes.number.isRequired,
    registerUrl: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      days: 0,
      registerUrl: ''
    };
  },

  render: function() {
    var props = this.props;

    return (
      <div className="CountDown">
        <p className="CountDown__days">{ props.days }</p>
        <p className="CountDown__daysToGo">days to go</p>
        <a href={ props.registerUrl } className="CountDown__register">Register</a>
      </div>
    );
  }
});
