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
    var clickHandler = props.onSelect && this.clickHandler;

    return (
      <a href={ props.result.url || '#' }
        className="SearchResult"
        onClick={ clickHandler }>
        { props.children }
      </a>
    );
  }
});
