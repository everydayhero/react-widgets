import React from 'react';

export default React.createClass({
  displayName: 'SearchResult',

  propTypes: {
    onSelect: React.PropTypes.func,
    result: React.PropTypes.object.isRequired
  },

  clickHandler: function(event) {
    this.props.onSelect(event, this.props.result);
  },

  render: function() {
    var props = this.props;
    var clickHandler = props.onSelect && this.clickHandler;

    return (
      <a href={ props.result.url || '#' }
        className="SearchResult"
        target="_parent"
        onClick={ clickHandler }>
        { props.children }
      </a>
    );
  }
});
