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
    total: React.PropTypes.number.isRequired,
    goal: React.PropTypes.number.isRequired,
    format: React.PropTypes.string,
    currencySymbol: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      format: '0,0',
      currencySymbol: '$',
      defaultI18n: {
        text: '**{total}** raised of **{goal}** goal'
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
    return Math.min(props.total / props.goal, 1);
  },

  renderProgressBar: function() {
    var progress = this.state.progress;
    var offsetWidth = numeral(progress).format('0%');
    var style = { width: offsetWidth || '100%' };

    return (
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

  renderText: function() {
    var props = this.props;

    return (
      <div className="GoalProgress__text">
        { this.tm('text', {
          total: this.formatCurrency(props.total),
          goal: this.formatCurrency(props.goal)
        }) }
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
