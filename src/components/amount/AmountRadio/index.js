"use strict";

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "AmountRadio",

  propTypes: {
    selected: React.PropTypes.number,
    amount: React.PropTypes.number,
    onClick: React.PropTypes.func,
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      selected: null,
      amount: null,
      onChange: function() {},
      name: 'AmountRadio'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.refs.radio.getDOMNode().checked = (nextProps.selected === this.props.amount);
  },

  handleClick: function() {
    this.props.onClick(this.props.amount);
  },

  render: function() {
    var classes = cx({
      'AmountRadio': true,
      'AmountRadio--selected': this.props.selected === this.props.amount
    });
    var order = ' AmountRadio--' + (this.props.index + 1);

    return (
      <label className={ classes + order } onClick={ this.handleClick }>
        { this.props.amount }
        <input ref="radio" type="radio" name={ this.props.name } value={ this.props.amount } id={ this.props.name + '-' + this.props.amount } />
      </label>
    );
  }
});
