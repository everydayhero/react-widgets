"use strict";

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var I18nMixin       = require('../../mixins/I18n');
var Icon            = require('../../helpers/Icon');
var numeral         = require('numeral');

module.exports = React.createClass({
  displayName: "GoalProgress",

  mixins: [PureRenderMixin, I18nMixin],

  propTypes: {
    currencySymbol: React.PropTypes.string,
    format: React.PropTypes.string,
    goal: React.PropTypes.number,
    i18n: React.PropTypes.object,
    total: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      currencySymbol: '$',
      format: '0,0',
      goal: 0,
      defaultI18n: {
        goal_text: '**{total}** raised of **{goal}** goal',
        no_goal_text: '**{total}** raised'
      }
    };
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

  formatCurrency: function(cents) {
    var props = this.props;
    return props.currencySymbol + numeral(cents / 100).format(props.format);
  },

  getMessage: function() {
    var props = this.props;

    return this.tm(props.goal > 0 ? 'goal_text' : 'no_goal_text', {
      total: this.formatCurrency(props.total),
      goal: this.formatCurrency(props.goal)
    });
  },

  renderText: function() {
    return (
      <div className="GoalProgress__text">
        { this.getMessage() }
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
