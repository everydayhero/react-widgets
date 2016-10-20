import React from 'react'
import cx from 'classnames'
import Icon from '../../helpers/Icon'

export default React.createClass({
  displayName: 'CallToActionButton',

  propTypes: {
    kind: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    label: React.PropTypes.node.isRequired,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    className: React.PropTypes.string,
    border: React.PropTypes.bool,
    reverse: React.PropTypes.bool,
    thin: React.PropTypes.bool,
    iconLeft: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      label: '',
      icon: '',
      type: 'button',
      className: '',
      href: null,
      disabled: false,
      thin: false,
      reverse: false,
      iconLeft: false
    }
  },

  getInitialState: function () {
    return {
      state: null
    }
  },

  handleClick: function (e) {
    if (this.props.onClick) {
      e.preventDefault()
      this.props.onClick(e)
    }
  },

  render: function () {
    var props = this.props
    var kind = props.kind
    var href = props.href
    var El = href ? 'a' : 'button'

    var classes = cx({
      'CallToActionButton': true,
      'CallToActionButton--cta': kind === 'cta',
      'CallToActionButton--primary': kind === 'primary',
      'CallToActionButton--secondary': kind === 'secondary',
      'CallToActionButton--tertiary': kind === 'tertiary',
      'CallToActionButton--noBorder': props.border === false,
      'CallToActionButton--disabled': props.disabled,
      'CallToActionButton--reverse': props.reverse,
      'CallToActionButton--thin': props.thin,
      'CallToActionButton--hasIcon': props.icon,
      'CallToActionButton--iconLeft': props.iconLeft
    })

    return (
      <El className={[classes, props.className].join(' ')}
        tabIndex={1}
        type={props.type}
        title={props.title}
        to={href}
        params={props.params}
        href={href}
        onMouseUp={!href && this.handleClick}
        onTouchStart={!href && this.handleClick}>
        <Icon className='CallToActionButton__icon' icon={props.icon} />
        <span className='CallToActionButton__label'>
          { props.label || props.children }
        </span>
      </El>
    )
  }
})
