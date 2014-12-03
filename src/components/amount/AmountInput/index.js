"use strict";

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "AmountInput",

  propTypes: {
    amount: React.PropTypes.number,
    onChange: React.PropTypes.func,
    symbol: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      amount: null,
      onChange: function() {},
      symbol: '$'
    };
  },

  getInitialState: function() {
    return {
      focused: false,
      type: "text"
    };
  },

  handleChange: function(e) {
    var val = parseInt(e.target.value, 10);
    if (!val || val <= 0) return this.props.onChange(0);
    this.props.onChange(val);
  },

  setTouch: function() {
    this.setState({ type: 'number' });
  },

  toggleFocus: function() {
    this.setState({ focused: !this.state.focused });
  },

  render: function() {
    var classes = cx({
      'AmountInput': true,
      'AmountInput--Selected': !!this.props.amount,
      'AmountInput--Focused': this.state.focused
    });

    return (
      <label className={ classes } onTouchStart={ this.setTouch }>
        <span className="AmountInput__Symbol">{ this.props.symbol }</span>
        <input ref="input" id={ this.props.name } type={ this.state.type } onChange={ this.handleChange } value={ this.props.amount } onFocus={ this.toggleFocus } onBlur={ this.toggleFocus } />
      </label>
    );
  }
});
