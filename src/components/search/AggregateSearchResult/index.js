"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'AggregateSearchResult',

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  render: function() {
    var props = this.props;

    return (
      <a href={ props.url || '#' }
        className="AggregateSearchResult">
        { props.children }
      </a>
    );
  }
});
