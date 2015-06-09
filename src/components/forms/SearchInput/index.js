"use strict";

var React     = require('react');
var Icon      = require('../../helpers/Icon');
var Input     = require('../Input');
var I18nMixin = require('../../mixins/I18n');
var Button    = require('hui/buttons/Button');

module.exports = React.createClass({
  displayName: "SearchInput",

  mixins: [I18nMixin],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    autoSelect: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    value: React.PropTypes.string,
    width: React.PropTypes.string,
    animateLabel: React.PropTypes.bool,
    i18n: React.PropTypes.object
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
      animateLabel: true,
      defaultI18n: {
        name: 'searchInput',
        label: 'Search'
      }
    };
  },

  handleChange: function(value) {
    this.setState({ value: value });
  },

  componentDidMount: function() {
    var value = this.refs.input.getDOMNode().value;
    if (value) {
      this.setState({ value: value });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value) {
      this.setState({ value: nextProps.value || '' });
    }
  },

  handleSubmit: function() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var width = props.width;
    var i18n  = { name: this.t('name'), label: this.t('label') };

    return (
      <div className="ehw-SearchInput">
        <div className="ehw-SearchInput__input">
          <Input {...props}
            ref="input"
            value={ state.value }
            output={ this.handleChange }
            onEnter={ this.handleSubmit }
            i18n={ i18n }
            spacing="compact" />
        </div>
        <div className="ehw-SearchInput__button">
          <Button onClick={ this.handleSubmit } kind="primary">
            <Icon icon="search" className="ehw-SearchInput__icon" fixedWidth={ true } />
          </Button>
        </div>
      </div>
    );
  }
});
