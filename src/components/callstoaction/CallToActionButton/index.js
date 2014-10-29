/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'CallToActionButton',

  render: function() {
    return (
      <a href={ this.props.btnUrl } className="CallToActionButton">{ this.props.btnLabel }</a>
    );
  }
});
