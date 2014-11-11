/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "PromoCharitiesTab",

  handleClick: function() {
    this.props.onClick(this.props.index)
  },

  render: function() {
    var active = this.props.active ? " active" : '';

    return (
      <div onClick={ this.handleClick } className={ "PromoCharitiesTab" + active }>{ this.props.label }</div>
    );
  }
});
