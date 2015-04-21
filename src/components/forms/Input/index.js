"use strict";

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx              = require('react/lib/cx');
var I18nMixin       = require('../../mixins/I18n');
var Icon            = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: "Input",

  mixins: [I18nMixin, PureRenderMixin],

  propTypes: {
    autoComplete: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    autoSelect: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    i18n: React.PropTypes.object,
    icon: React.PropTypes.string,
    mask: React.PropTypes.func,
    modal: React.PropTypes.func,
    output: React.PropTypes.func,
    validate: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    width: React.PropTypes.string,
    onEnter: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autoComplete: false,
      autoFocus: false,
      autoSelect: false,
      disabled: false,
      error: false,
      icon: null,
      mask: null,
      modal: null,
      output: null,
      validate: null,
      readOnly: false,
      required: false,
      showIcon: true,
      type: 'text',
      value: '',
      width: 'full',
      spacing: 'loose',
      defaultI18n: {
        name: 'input',
        label: 'Input'
      }
    };
  },

  getInitialState: function() {
    return {
      error: this.props.error,
      focused: false,
      valid: false,
      value: this.props.value,
      waiting: false
    };
  },

  componentDidMount: function() {
    if (this.props.autoFocus) {
      this.refs.input.getDOMNode().focus();
    }
    if (this.props.autoSelect) {
      this.refs.input.getDOMNode().select();
    }
    if (this.props.value && !this.props.disabled && this.props.validate) {
      this.validate();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.error !== this.state.error) {
      this.setState({ error: nextProps.error });
    }
  },

  handleChange: function(e) {
    var value = (this.props.readOnly || this.props.disabled) ? this.state.value
              : this.props.mask ? this.props.mask(e.target.value)
              : e.target.value;

    this.setState({
      error: false,
      valid: false,
      value: value
    });
    if (this.props.output) {
      this.props.output(value);
    }
  },

  setValue: function(value) {
    if (this.props.disabled) {
      return false;
    }
    this.setState({
      error: false,
      valid: false,
      value: value
    }, this.handleBlur);
  },

  handleFocus: function() {
    this.setState({ focused: true });
    if (this.props.modal) {
      this.props.modal({
        element: this.getDOMNode(),
        value: this.state.value,
        callback: this.setValue
      });
    }
  },

  handleBlur: function() {
    this.setState({ focused: false });
    this.validate();
  },

  handleKeyUp: function(e) {
    if(e.key === 'Enter' && this.props.onEnter) {
      this.props.onEnter(this.state.value);
    }
  },

  setValid: function(valid) {
    this.setState({
      error: !valid,
      valid: valid,
      waiting: false
    });
  },

  validate: function() {
    var props = this.props;
    var value = this.state.value;
    if (props.required) {
      this.setValid(value && !!value.trim());
    }
    if (props.validate) {
      this.setState({ waiting: true });
      props.validate(value, this.setValid);
    }
  },

  renderIcon: function() {
    var props = this.props;
    var state = this.state;
    var icon = !props.showIcon ? false
               : state.waiting ? 'refresh'
               : state.valid ? 'check'
               : state.error ? 'times'
               : props.disabled ? 'minus'
               : props.icon ? props.icon
               : (props.required && !state.value) ? 'caret-left'
               : false;
    return icon && <Icon icon={ icon } className="Input__icon" fixedWidth={ true } />;
  },

  renderMessage: function(bool) {
    return bool && (
      <div className="Input__message">
        { this.state.error ? this.t('error') : this.t('hint') }
      </div>
    );
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var t = this.t;
    var width = props.width;
    var spacing = props.spacing;
    var enabled = !props.disabled;
    var classes = cx({
      'Input': true,
      'Input--hasValue': state.value && !!state.value.trim(),
      'Input--focused': state.focused,
      'Input--valid': state.valid,
      'Input--error': state.error,
      'Input--disabled': props.disabled,
      'Input--full': !width || width === 'full',
      'Input--wide': width === 'wide',
      'Input--half': width === 'half',
      'Input--narrow': width === 'narrow',
      'Input--compact': spacing === 'compact',
      'Input--tight': spacing === 'tight',
      'Input--loose': spacing === 'loose'
    });

    return (
      <div className={ classes }>
        <label className="Input__label" htmlFor={ t('name') }>
          { t('label') }
          <input
            autoComplete={ props.autoComplete ? 'on' : 'off' }
            className="Input__input"
            disabled={ props.disabled }
            id={ t('name') }
            name={ t('name') }
            onBlur={ enabled && this.handleBlur }
            onChange={ enabled && this.handleChange }
            onFocus={ enabled && this.handleFocus }
            onKeyUp={ enabled && this.handleKeyUp }
            ref="input"
            type={ props.type }
            value={ state.value } />
          { this.renderIcon() }
        </label>
        { this.renderMessage(t('error') || t('hint')) }
      </div>
    );
  }
});
