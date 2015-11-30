'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'AggregateSearchResult',

  propTypes: {
    result: React.PropTypes.object,
    onSelect: React.PropTypes.func
  },

  handleClick: function() {
    this.props.onSelect(this.props.result);
  },

  render: function() {
    return (
      <div className="AggregateSearchResult" onClick={ this.handleClick }>
        { this.props.children }
      </div>
    );
  }
});
