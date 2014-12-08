"use strict";

var React = require('react/addons');
var cx = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "AddressStatus",

  propTypes: {
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    success: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      loading: false,
      error: false,
      success: false
    };
  },

  render: function() {
    var classes = cx({
      'AddressStatus fa': true,
      'AddressStatus--error fa-exclamation-circle': this.props.error,
      'AddressStatus--loading fa-circle-o-notch fa-spin': this.props.loading,
      'AddressStatus--success fa-chevron-down': this.props.success
    });
    return <i className={ classes }></i>;
  }
});
