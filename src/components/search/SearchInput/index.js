/** @jsx React.DOM */
"use strict";

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'SearchInput',

  getInitialState: function() {
    return {
      hasValue: false
    }
  },

  getDefaultProps: function() {
    return {
      autoFocus: true
    }
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
    var value = e.target.value;

    this.setState({
      hasValue: (value !== '')
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  progressSpinner: function() {
    if (this.props.isQueryInProgress) {
      return <Icon className="SearchInput__progressSpinner" icon="refresh" spin={ true }/>;
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
        <Icon icon="search"  className="SearchInput__icon"/>
        { this.progressSpinner() }
        <input
          id={ this.props.id }
          type="text"
          onChange={ this.onChange }
          ref="input"
          placeholder={ this.props.label }
          className="SearchInput__input"/>
      </div>
    );
  }
});
