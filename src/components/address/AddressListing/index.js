"use strict";

var React = require('react/addons');
var cx = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "AddressListing",

  propTypes: {
    id: React.PropTypes.string,
    index: React.PropTypes.number,
    focused: React.PropTypes.bool,
    label: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      id: '',
      index: 0,
      focused: false,
      label: ''
    };
  },

  handleClick: function() {
    this.props.onClick(this.props.id);
  },

  handleMouseEnter: function() {
    this.props.onMouseEnter(this.props.index);
  },

  render: function() {
    var classes = cx({
      'AddressListing': true,
      'AddressListing--focused': this.props.focused
    });
    return (
      <div className={ classes } onMouseEnter={ this.handleMouseEnter } onClick={ this.handleClick } >
        <div className="AddressListing__details">{ this.props.label }</div>
      </div>
    );
  }
});