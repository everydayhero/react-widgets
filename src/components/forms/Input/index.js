"use strict";

var React     = require('react');
var cx        = require('react/lib/cx');
var I18nMixin = require('../../mixins/I18n');
var Icon      = require('../../helpers/Icon');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: "Input",

  propTypes: {
    autoComplete: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    i18n: React.PropTypes.object,
    icon: React.PropTypes.string,
    mask: React.PropTypes.func,
    modal: React.PropTypes.func,
    output: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    type: React.PropTypes.string,
    validate: React.PropTypes.func,
    value: React.PropTypes.string,
    width: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      autoComplete: false,
      autoFocus: false,
      defaultI18n: {
        name: 'input',
        label: 'Input'
      },
      disabled: false,
      error: false,
      icon: null,
      mask: null,
      modal: null,
      output: null,
      readOnly: false,
      required: false,
      showIcon: true,
      spacing: '',
      type: 'text',
      validate: null,
      value: '',
      width: 'full'
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

  setValid: function(valid) {
    this.setState({
      error: !valid,
      valid: valid,
      waiting: false
    });
  },

  validate: function() {
    if (this.props.validate) {
      this.setState({ waiting: true });
      return this.props.validate(this.state.value, this.setValid);
    }
    if (this.props.required) {
      var valid = this.state.value && !!this.state.value.trim();
      this.setValid(valid);
    }
  },

  renderIcon: function() {
    var icon = !this.props.showIcon ? false
               : this.state.waiting ? 'refresh'
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
      'Input--hasValue': this.state.value && !!this.state.value.trim(),
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
            disabled={ this.props.disabled }
            id={ this.t('name') }
            name={ this.t('name') }
            onBlur={ enabled && this.handleBlur }
            onChange={ enabled && this.handleChange }
            onFocus={ enabled && this.handleFocus }
            ref="input"
            type={ this.props.type }
            value={ this.state.value } />
          { this.renderIcon() }
        </label>
        { this.renderMessage(this.t('error') || this.t('hint')) }
      </div>
    );
  }
});
