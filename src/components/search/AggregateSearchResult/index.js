"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'AggregateSearchResult',

  propTypes: {
    url: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },

  render: function() {
    var props = this.props;

    return (
      <a href={ props.url || '#' }
        className="AggregateSearchResult"
        onClick={ props.onSelect }>
        { props.children }
      </a>
    );
  }
});
