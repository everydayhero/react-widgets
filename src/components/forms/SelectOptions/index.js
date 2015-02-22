"use strict";

var React               = require('react/addons');
var PureRenderMixin     = React.addons.PureRenderMixin;
var SelectOption        = require('../SelectOption');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

module.exports = React.createClass({
  displayName: "SelectOptions",

  mixins: [PureRenderMixin],

  propTypes: {
    options: React.PropTypes.array.isRequired,
    labelKey: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      fauxFocus: 0
    };
  },

  componentWillMount: function(nextProps, nextState) {
    addEventListener(window, 'keydown', this.keyHandler);
    addEventListener(window, 'mousedown', this.clickHandler);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'keydown', this.keyHandler);
    removeEventListener(window, 'mousedown', this.clickHandler);
  },

  clickHandler: function(e) {
    if (!this.getDOMNode().contains(e.target)) {
      this.props.onSelect(false);
    }
  },

  keyHandler: function(e) {
    var key = e.keyCode || e.which;
    var i = this.state.fauxFocus;
    var options = this.props.options;
    if (key === 40) {
      e.preventDefault();
      i = (i + 1) % options.length;
      return this.setFauxFocus(i);
    }
    if (key === 38) {
      e.preventDefault();
      i = i <= 0 ? options.length - 1 : i - 1;
      return this.setFauxFocus(i);
    }
    if (e.keyCode === 9) {
      this.props.onSelect(i > 0 ? options[i] : false);
    }
    if (key === 13 && i >= 0) {
      e.preventDefault();
      this.props.onSelect(options[i]);
    }
  },

  setFauxFocus: function(i) {
    this.setState({ fauxFocus: i });
  },

  renderOptions: function() {
    var key = this.props.labelKey;
    return this.props.options.map(function(d, i) {
      return <SelectOption
        key={ d[key] + i }
        index={ i }
        focused={ i === this.state.fauxFocus }
        option={ d }
        label={ d[key] }
        onSelect={ this.props.onSelect }/>;
    }, this);
  },

  render: function() {
    return (
      <div className="SelectOptions">
        { this.renderOptions() || 'No matches found' }
      </div>
    );
  }
});
