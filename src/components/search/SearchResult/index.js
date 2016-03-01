"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'SearchResult',

  propTypes: {
    onSelect: React.PropTypes.func,
    result: React.PropTypes.object.isRequired
  },

  clickHandler: function(event) {
    this.props.onSelect(this.props.result, event);
  },

  render: function() {
    var props = this.props;
    var clickHandler = props.onSelect && this.clickHandler;

    return (
      <a href={ props.result.url || '#' }
        target="_parent"
        className="SearchResult"
        onClick={ clickHandler }>
        { props.children }
      </a>
    );
  }
});
