import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import cx from 'classnames'

export default React.createClass({
  displayName: 'AddressListing',

  mixins: [PureRenderMixin],

  propTypes: {
    id: React.PropTypes.string,
    index: React.PropTypes.number,
    focused: React.PropTypes.bool,
    label: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      id: '',
      index: 0,
      focused: false,
      label: ''
    }
  },

  handleClick: function (e) {
    e.preventDefault()
    this.props.onClick(this.props.id)
  },

  handleMouseEnter: function () {
    this.props.onMouseEnter(this.props.index)
  },

  render: function () {
    var classes = cx({
      'AddressListing': true,
      'AddressListing--focused': this.props.focused
    })
    return (
      <div className={classes} onMouseEnter={this.handleMouseEnter} onClick={this.handleClick} >
        <div className='AddressListing__details'>{ this.props.label }</div>
      </div>
    )
  }
})
