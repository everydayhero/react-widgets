"use strict";

var React           = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var cx              = require('classnames');

module.exports = React.createClass({
  displayName: "SelectOption",

  mixins: [PureRenderMixin],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    focused: React.PropTypes.bool,
    option: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      focused: false
    };
  },

  handleClick: function(e) {
    e.preventDefault();
    this.props.onSelect(this.props.option);
  },

  render: function() {
    var classes = cx({
      "SelectOption": true,
      "SelectOption--focused": this.props.focused
    });

    return (
      <div className={ classes } onClick={ this.handleClick }>
        { this.props.label }
      </div>
    );
  }
});
