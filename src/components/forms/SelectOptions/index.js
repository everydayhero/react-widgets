"use strict";

var _                   = require('lodash');
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
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      selected: 0
    };
  },

  getInitialState: function() {
    return {
      fauxFocus: this.props.selected
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setFauxFocus(nextProps.selected || 0);
  },

  componentDidMount: function(nextProps, nextState) {
    this.setState({ menu: this.getDOMNode() }, this.scrollMenu);
    addEventListener(window, 'keydown', this.keyHandler);
    addEventListener(window, 'mousedown', this.clickHandler);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'keydown', this.keyHandler);
    removeEventListener(window, 'mousedown', this.clickHandler);
  },

  clickHandler: function(e) {
    if (this.state.menu && !this.state.menu.contains(e.target)) {
      var option = this.props.options[this.state.fauxFocus];
      this.props.onSelect(option || false);
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
      this.props.onSelect(options[i] || false);
    }
    if (key === 13 && options[i]) {
      e.preventDefault();
      this.props.onSelect(options[i]);
    }
  },

  setFauxFocus: function(i) {
    this.setState({ fauxFocus: i }, this.scrollMenu);
  },

  scrollMenu: function() {
    var menu = this.state.menu;
    var listLength = this.props.options.length;
    if (!menu || !listLength) {
      return;
    }

    if (this.state.fauxFocus <= 0) {
      menu.scrollTop = 0;
      return;
    }

    var top = menu.scrollTop;
    var bottom = menu.scrollTop + menu.offsetHeight;
    var pos = _.reduce(_.range(0, this.state.fauxFocus),
      function(sum, i) { return sum + menu.children[i].offsetHeight; }, 0);

    var itemHeight = menu.children[this.state.fauxFocus].offsetHeight;
    var margin = menu.offsetHeight * 0.10;
    if (pos < top + margin) {
      menu.scrollTop = Math.max(pos - margin, 0);
    } else if (pos + itemHeight > bottom - margin) {
      menu.scrollTop = Math.min(pos + itemHeight + margin, menu.scrollHeight) - menu.offsetHeight;
    }
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
