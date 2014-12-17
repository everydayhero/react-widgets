"use strict";

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'SearchInput',

  propTypes: {
    autoFocus: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      autoFocus: false
    };
  },

  componentDidMount: function() {
    if (this.props.autoFocus) {
      var node = this.refs.input.getDOMNode();
      if (node.focus) {
        node.focus();
      }
    }
  },

  keyHandler: function(event) {
    if (event.key === 'Escape') {
      this.refs.input.getDOMNode().blur();
    }
  },

  onChange: function(e) {
    this.delayedChange(e.target.value);
  },

  delayedChange: _.debounce(function(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }, 500),

  progressSpinner: function() {
    if (this.props.isSearching) {
      return <Icon className="SearchInput__progressSpinner" icon="refresh" />;
    } else {
      return null;
    }
  },

  render: function() {
    var classes = _.compact([
      'SearchInput',
      this.props.className
    ]).join(' ');

    return (
      <div className={ classes }>
        <Icon icon="search"  className="SearchInput__icon" />
        { this.progressSpinner() }
        <input
          id={ this.props.id }
          className="SearchInput__input"
          ref="input"
          type="text"
          onChange={ this.onChange }
          placeholder={ this.props.label } />
      </div>
    );
  }
});
