"use strict";

var React        = require('react');
var AmountInput  = require('../AmountInput');
var AmountRadio  = require('../AmountRadio');

module.exports = React.createClass({
  displayName: "Amount",

  propTypes: {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    amounts: React.PropTypes.array,
    output: React.PropTypes.func,
    currency: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: 'Amount',
      name: 'amount',
      amounts: [500, 700, 1500, 3000],
      output: function() {},
      currency: '$'
    };
  },

  getInitialState: function() {
    return {
      preset: this.props.amounts[1],
      custom: null
    };
  },

  componentDidMount: function() {
    this.props.output(this.state.preset || this.state.custom);
  },

  componentDidUpdate: function() {
    this.props.output(this.state.preset || this.state.custom);
  },

  setPreset: function(amount) {
    this.setState({ custom: null, preset: amount });
  },

  setCustom: function(amount) {
    if (amount === 0) {
      return this.setPreset(this.props.amounts[1]);
    }
    this.setState({ custom: amount, preset: null });
  },

  renderRadios: function() {
    return this.props.amounts.map(function(d, i) {
      return <AmountRadio key={ d + i } index={ i } selected={ this.state.preset } amount={ d } name={ this.props.name } onClick={ this.setPreset } />;
    }, this);
  },

  render: function() {
    return (
      <div className="Amount">
        <div className="Amount__label">{ this.props.label }</div>
        { this.renderRadios() }
        <AmountInput name={ this.props.name } amount={ this.state.custom } onChange={ this.setCustom } symbol={ this.props.currency} />
      </div>
    );
  }
});
