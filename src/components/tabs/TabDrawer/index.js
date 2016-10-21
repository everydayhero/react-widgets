import React from 'react'
import Icon from '../../helpers/Icon'

export default React.createClass({
  displayName: 'TabDrawer',
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    onKeyDown: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    tabId: React.PropTypes.string.isRequired,
    controls: React.PropTypes.string.isRequired
  },

  handleClick: function () {
    this.props.onClick(this.props.index)
  },

  handleKeyDown: function (event) {
    this.props.onKeyDown(event, this.props.index)
  },

  renderIcon: function () {
    if (this.props.active) {
      return <Icon className='TabDrawer__icon' icon='caret-down' />
    }

    return <Icon className='TabDrawer__icon' icon='caret-right' />
  },

  render: function () {
    var active = this.props.active ? ' TabDrawer--active' : ''

    return (
      <a
        href={'#' + this.props.tabId}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={'TabDrawer' + active}
        role='tab'
        id={this.props.tabId}
        aria-selected={this.props.active}
        aria-controls={this.props.controls}
        tabIndex='0'>
        <span className='TabDrawer__label' title={this.props.label}>{ this.props.label }</span>
        { this.renderIcon() }
      </a>
    )
  }
})
