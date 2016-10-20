import React from 'react'
import cx from 'classnames'

export default React.createClass({
  displayName: 'AmountRadio',

  propTypes: {
    selected: React.PropTypes.number,
    amount: React.PropTypes.number,
    onClick: React.PropTypes.func,
    name: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      selected: null,
      amount: null,
      onChange: function () {},
      name: 'AmountRadio'
    }
  },

  handleClick: function () {
    this.props.onClick(this.props.amount)
  },

  render: function () {
    var classes = cx({
      'AmountRadio': true,
      'AmountRadio--selected': this.props.selected === this.props.amount
    })
    var order = ' AmountRadio--' + (this.props.index + 1)

    return (
      <label className={classes + order} onClick={this.handleClick}>
        { this.props.amount }
        <input
          ref='radio'
          type='radio'
          readOnly
          checked={this.props.selected === this.props.amount}
          name={this.props.name}
          value={this.props.amount}
          id={this.props.name + '-' + this.props.amount} />
      </label>
    )
  }
})
