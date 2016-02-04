'use strict';

var _     = require('lodash');
var React = require('react');
var Icon  = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'SearchInput',

  propTypes: {
    autoFocus: React.PropTypes.bool,
    searchTerm: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      autoFocus: false
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.searchTerm || ''
    };
  },

  componentDidMount: function() {
    if (this.props.autoFocus) {
      var node = this.refs.input;
      if (node.focus) {
        node.focus();
        if (this.props.searchTerm) {
          node.setSelectionRange(this.props.searchTerm.length,this.props.searchTerm.length);
        }
      }
    }
  },

  keyHandler: function(event) {
    if (event.key === 'Escape') {
      this.refs.input.blur();
    }
  },

  onChange: function(e) {
    this.delayedChange(e.target.value);
    this.setState({ searchTerm: e.target.value });
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
          value={ this.state.searchTerm }
          onChange={ this.onChange }
          placeholder={ this.props.label } />
      </div>
    );
  }
});
