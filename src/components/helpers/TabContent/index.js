/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "TabContent",

  render: function() {
    var active = this.props.active ? " active" : '';

    return (
      <div className={ "Content" + active }>{ this.props.text }</div>
    );
  }
});
