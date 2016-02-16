"use strict";

var React           = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Icon            = require('../../helpers/Icon');
var numeral         = require('numeral');

module.exports = React.createClass({
  displayName: "GoalProgress",

  mixins: [PureRenderMixin],

  propTypes: {
    goal: React.PropTypes.number.isRequired,
    text: React.PropTypes.object.isRequired,
    total: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      progress: this.getProgress()
    };
  },

  componentDidUpdate: function() {
    this.setState({ progress: this.getProgress() });
  },

  getProgress: function() {
    var props = this.props;
    return props.goal > 0 ? Math.min(props.total / props.goal, 1) : 0;
  },

  renderProgressBar: function() {
    var progress = this.state.progress;
    var offsetWidth = numeral(progress).format('0%');
    var style = { width: offsetWidth || '100%' };

    return progress > 0 && (
      <div className="GoalProgress__bar" >
        <div className="GoalProgress__barFill" style={ style }></div>
      </div>
    );
  },

  renderIcon: function() {
    var classes = "GoalProgress__icon";
    if (this.state.progress === 1) {
      classes += "--achieved";
    }

    return (
      <Icon icon="trophy" className={ classes } />
    );
  },

  renderText: function() {
    return (
      <div className="GoalProgress__text">
        { this.props.text }
      </div>
    );
  },

  render: function() {
    return (
      <div className="GoalProgress">
        { this.renderIcon() }
        <div className="GoalProgress__area">
          { this.renderProgressBar() }
          { this.renderText() }
        </div>
      </div>
    );
  }
});
