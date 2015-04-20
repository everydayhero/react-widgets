"use strict";

var React = require('react');
var cx = require('react/lib/cx');
var Icon = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    kind: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    label: React.PropTypes.node.isRequired,
    href: React.PropTypes.string,
    params: React.PropTypes.object,
    icon: React.PropTypes.string,
    border: React.PropTypes.bool,
    reverse: React.PropTypes.bool,
    thin: React.PropTypes.bool,
    iconLeft: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      label: '',
      icon: '',
      type: 'button',
      href: null,
      disabled: false,
      thin: false,
      reverse: false,
      iconLeft: false
    };
  },

  getInitialState: function() {
    return {
      state: null
    };
  },

  handleClick: function(e) {
    e.preventDefault();
    this.props.onClick(e);
  },

  render: function() {
    var props = this.props;
    var kind = props.kind;
    var href = props.href;
    var El = href ? 'a' : 'button';

    var classes = cx({
      'Button': true,
      'Button--cta': kind === 'cta',
      'Button--primary': kind === 'primary',
      'Button--secondary': kind === 'secondary',
      'Button--tertiary': kind === 'tertiary',
      'Button--noBorder': props.border === false,
      'Button--disabled': props.disabled,
      'Button--reverse': props.reverse,
      'Button--thin': props.thin,
      'Button--hasIcon': props.icon,
      'Button--iconLeft': props.iconLeft
    });

    return (
      <El className={ [classes, props.className].join(' ') }
        tabIndex={ 1 }
        type={ props.type }
        title={ props.title }
        to={ href }
        params={ props.params }
        href={ href }
        onMouseUp={ !href && this.handleClick }
        onTouchStart={ !href && this.handleClick }>
        <Icon className="Button__icon" icon={ props.icon }/>
        <span className="Button__label">
          { props.label || props.children }
        </span>
      </El>
    );
  }
});
