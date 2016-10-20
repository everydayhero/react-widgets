import React from 'react';
import cx from 'classnames';
import AmountInput from '../AmountInput';
import AmountRadio from '../AmountRadio';

export default React.createClass({
  displayName: 'Amount',

  propTypes: {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    spacing: React.PropTypes.string,
    amount: React.PropTypes.number,
    amounts: React.PropTypes.array,
    output: React.PropTypes.func,
    currency: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: 'Amount',
      name: 'amount',
      spacing: 'loose',
      amount: null,
      amounts: [500, 700, 1500, 3000],
      output: function() {},
      currency: '$'
    };
  },

  getInitialState: function() {
    var amount = this.props.amount > 0 ? this.props.amount : this.props.amounts[1];
    var preset = this.props.amounts.indexOf(amount) < 0 ? null : amount;
    var custom = preset ? null : amount;

    return { custom: custom, preset: preset };
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
      return <AmountRadio key={ d + i } index={ i } selected={ this.state.preset } amount={ d } name={ 'AmountRadio-' + this.props.name } onClick={ this.setPreset } />;
    }, this);
  },

  render: function() {
    var classes = cx({
      'Amount': true,
      'Amount--compact': this.props.spacing === 'compact',
      'Amount--tight': this.props.spacing === 'tight',
      'Amount--loose': this.props.spacing === 'loose'
    });
    return (
      <div className={ classes }>
        <div className="Amount__label">{ this.props.label }</div>
        { this.renderRadios() }
        <AmountInput name={ 'AmountInput-' + this.props.name } amount={ this.state.custom } onChange={ this.setCustom } symbol={ this.props.currency} />
        <input type="hidden" name={ this.props.name } value={ this.state.preset || this.state.custom }/>
      </div>
    );
  }
});
