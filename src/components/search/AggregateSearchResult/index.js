'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'AggregateSearchResult',

  propTypes: {
    url: React.PropTypes.string,
    result: React.PropTypes.object,
    onSelect: React.PropTypes.func
  },

  handleClick: function(e) {
    e.preventDefault();
    this.props.onSelect(this.props.result);
  },

  render: function() {
    var props       = this.props;
    var handleClick = props.onSelect && this.handleClick;

    return (
      <a href={ props.url || '#' }
        className="AggregateSearchResult"
        onClick={ handleClick }>
        { this.props.children }
      </a>
    );
  }
});
