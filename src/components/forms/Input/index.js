"use strict";

var React     = require('react');
var cx        = require('react/lib/cx');
var I18nMixin = require('../../mixins/I18n');
var Icon      = require('../../helpers/Icon');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: "Input",

  propTypes: {
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    autoComplete: React.PropTypes.bool,
    required: React.PropTypes.bool,
    error: React.PropTypes.bool,
    mask: React.PropTypes.func,
    validate: React.PropTypes.func,
    output: React.PropTypes.func,
    modal: React.PropTypes.func,
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    width: React.PropTypes.string,
    spacing: React.PropTypes.string,
    value: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      readOnly: false,
      disabled: false,
      autoFocus: false,
      autoComplete: false,
      required: false,
      error: false,
      mask: null,
      validate: null,
      output: null,
      modal: null,
      type: 'text',
      value: '',
      icon: null,
      width: 'full',
      spacing: '',
      defaultI18n: {
        name: 'input',
        label: 'Input'
      }
    };
  },

  getInitialState: function() {
    return {
      focused: false,
      value: this.props.value,
      waiting: false,
      valid: false,
      error: this.props.error
    };
  },

  componentDidMount: function() {
    if (this.props.autoFocus) {
      this.refs.input.getDOMNode().focus();
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
      valid: false,
      error: false,
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
      valid: false,
      error: false,
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
    if (this.props.required) {
      this.validate();
    }
  },

  setValid: function(valid) {
    this.setState({
      valid: valid,
      error: !valid,
      waiting: false
    });
  },

  validate: function() {
    if (this.props.validate) {
      this.setState({ waiting: true });
      return this.props.validate(this.state.value, this.setValid);
    }
    this.setState({
      valid: !!this.state.value,
      error: !this.state.value
    });
  },

  renderIcon: function() {
    var icon = this.state.waiting ? 'refresh'
               : this.state.valid ? 'check'
               : this.state.error ? 'times'
               : this.props.disabled ? 'minus'
               : this.props.icon ? this.props.icon
               : (this.props.required && !this.state.value) ? 'caret-left'
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
    var enabled = !this.props.disabled;
    var classes = cx({
      'Input': true,
      'Input--hasValue': !!this.state.value,
      'Input--focused': this.state.focused,
      'Input--valid': this.state.valid,
      'Input--error': this.state.error,
      'Input--disabled': this.props.disabled,
      'Input--full': !this.props.width || this.props.width === 'full',
      'Input--wide': this.props.width === 'wide',
      'Input--half': this.props.width === 'half',
      'Input--narrow': this.props.width === 'narrow',
      'Input--tight': this.props.spacing === 'tight',
      'Input--loose': this.props.spacing === 'loose'
    });

    return (
      <div className={ classes }>
        <label className="Input__label" htmlFor={ this.t('name') }>
          { this.t('label') }
          <input
            autoComplete={ this.props.autoComplete ? 'on' : 'off' }
            className="Input__input"
            ref="input"
            type={ this.props.type }
            id={ this.t('name') }
            name={ this.t('name') }
            value={ this.state.value }
            disabled={ this.props.disabled }
            onChange={ enabled && this.handleChange }
            onFocus={ enabled && this.handleFocus }
            onBlur={ enabled && this.handleBlur } />
          { this.renderIcon() }
        </label>
        { this.renderMessage(this.t('error') || this.t('hint')) }
      </div>
    );
  }
});
