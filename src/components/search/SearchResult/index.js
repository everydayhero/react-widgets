/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'SearchResult',

  propTypes: {
    onSelect: React.PropTypes.func,
    result: React.PropTypes.object.isRequired
  },

  clickHandler: function(event) {
    event.preventDefault();
    this.props.onSelect(this.props.result);
  },

  render: function() {
    var props = this.props;
    var url = props.onSelect ? '#' : props.url;
    var clickHandler = props.onSelect && this.clickHandler;

    return (
      <a href={ url }
        className="SearchResult"
        onClick={ clickHandler }>
        { props.children }
      </a>
    );
  }
});
