'use strict';

var React = require('react');
var effect = require('../../../lib/effect');

module.exports = React.createClass({
  displayName: 'CountDown',
  propTypes: {
    days: React.PropTypes.number.isRequired,
    registerUrl: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    linkColor: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      days: 0,
      registerUrl: '',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      linkColor: '#FF7E6B'
    };
  },

  render: function() {
    var props = this.props;
    var customStyle = {
      backgroundColor: props.backgroundColor,
      color: props.textColor
    };
    var linkStyle = {
      color: props.linkColor
    };

    return (
      <div className="CountDown" style={ customStyle }>
        <p className="CountDown__days">{ props.days }</p>
        <p className="CountDown__daysToGo">days to go</p>
        <a href={ props.registerUrl } className="CountDown__register" style={ linkStyle }>Register</a>
      </div>
    );
  }
});
