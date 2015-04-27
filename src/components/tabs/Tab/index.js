"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "Tab",
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    onKeyDown: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    tabId: React.PropTypes.string.isRequired,
    controls: React.PropTypes.string.isRequired
  },

  handleClick: function() {
    this.props.onClick(this.props.index);
  },

  handleKeyDown: function(event) {
    this.props.onKeyDown(event, this.props.index);
  },

  render: function() {
    var active = this.props.active ? " Tab--active" : '';

    return (
      <div
        onClick={ this.handleClick }
        onKeyDown={ this.handleKeyDown }
        className={ "Tab" + active }
        role="tab"
        id={ this.props.tabId }
        aria-selected={ this.props.active }
        aria-controls={ this.props.controls }
        tabIndex="0">
        { this.props.label }
      </div>
    );
  }
});
