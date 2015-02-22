"use strict";

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx              = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "SelectOption",

  mixins: [PureRenderMixin],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    focused: React.PropTypes.bool,
    option: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    onMouseEnter: React.PropTypes.func.isRequired,
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

  handleMouseEnter: function() {
    this.props.onMouseEnter(this.props.index);
  },

  render: function() {
    var classes = cx({
      "SelectOption": true,
      "SelectOption--focused": this.props.focused
    });

    return (
      <div className={ classes } onMouseEnter={ this.handleMouseEnter } onClick={ this.handleClick }>
        { this.props.label }
      </div>
    );
  }
});
