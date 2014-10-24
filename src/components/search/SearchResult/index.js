/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'SearchResult',

  clickHandler: function(event) {
    event.preventDefault();
    this.props.onSelect(this.props.result);
  },

  render: function() {
    return (
      <a href="#"
        className="SearchResult"
        key={ this.props.result.id }
        onClick={ this.clickHandler }>
        { this.props.children }
      </a>
    )
  }
});
