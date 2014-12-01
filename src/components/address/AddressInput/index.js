"use strict";

var React = require('react/addons');
var cx = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "AddressInput",

  propTypes: {
    error: React.PropTypes.bool,
    valid: React.PropTypes.bool,
    padRight: React.PropTypes.bool,
    value: React.PropTypes.string,
    width: React.PropTypes.string,
    label: React.PropTypes.string,
    focusOnMount: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      error: false,
      valid: false,
      padRight: false,
      value: '',
      width: '',
      label: '',
      focusOnMount: false
    };
  },

  getInitialState: function() {
    return {
      focus: false
    };
  },

  componentDidMount: function() {
    if (this.props.focusOnMount) {
      this.refs.input.getDOMNode().focus();
    }
  },

  handleChange: function(e) {
    if (!!this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  },

  handleFocus: function() {
    this.setState({ focus: true });
  },

  handleBlur: function() {
    this.setState({ focus: false });
  },

  render: function() {
    var classes = cx({
      'AddressInput': true,
      'AddressInput--Error': this.props.error,
      'AddressInput--Valid': this.props.valid,
      'AddressInput--PadRight': this.props.padRight,
      'AddressInput--Focused': this.state.focus,
      'AddressInput--Displaced': this.state.focus || this.props.value,
      'AddressInput--Full': !this.props.width || this.props.width === 'full',
      'AddressInput--Wide': this.props.width === 'wide',
      'AddressInput--Half': this.props.width === 'half',
      'AddressInput--Narrow': this.props.width === 'narrow'
    });
    return (
      <div className={ classes }>
        <label className="AddressInput__Label" htmlFor={ this.props.id }>{ this.props.label }</label>
        <input className="AddressInput__Field" ref={ "input" } id={ this.props.id } value={ this.props.value } onChange={ this.handleChange } onFocus={ this.handleFocus } onBlur={ this.handleBlur } />
      </div>
    );
  }
});
