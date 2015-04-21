"use strict";

var React  = require('react');
var Icon   = require('../../helpers/Icon');
var Input  = require('../Input');
var Button = require('hui/buttons/Button');

module.exports = React.createClass({
  displayName: "SearchInput",

  propTypes: {
    autoFocus: React.PropTypes.bool,
    autoSelect: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    value: React.PropTypes.string,
    width: React.PropTypes.string,
    label: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  getDefaultProps: function() {
    return {
      autoFocus: false,
      autoSelect: false,
      onSubmit: null,
      value: '',
      width: 'full',
      label: 'Search'
    };
  },

  handleChange: function(value) {
    this.setState({
      value: value
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value || ''
      });
    }
  },

  handleSubmit: function() {
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var width = props.width;
    var i18n  = { label: props.label };

    return (
      <div className="rw-SearchInput">
        <div className="rw-SearchInput__input">
          <Input {...props}
            value={ state.value }
            output={ this.handleChange }
            onEnter={ this.handleSubmit }
            i18n={ i18n }
            spacing="compact" />
        </div>
        <div className="rw-SearchInput__button">
          <Button onClick={ this.handleSubmit } kind="primary">
            <Icon icon="search" className="rw-SearchInput__icon" fixedWidth={ true } />
          </Button>
        </div>
      </div>
    );
  }
});
