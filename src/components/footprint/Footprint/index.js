"use strict";

var React               = require('react/addons');
var cx                  = require('react/lib/cx');
var _                   = require('lodash');
var tweenState          = require('react-tween-state');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');
var FootprintGroup      = require('../FootprintGroup');
var FootprintTile       = require('../FootprintTile');
var FootprintTip        = require('../FootprintTip');
var FootprintTipLine    = require('../FootprintTipLine');

module.exports = React.createClass({
  mixins: [tweenState.Mixin],

  displayName: "Footprint",

  propTypes: {
    userUrl: React.PropTypes.string,
    userImage: React.PropTypes.string,
    userName: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    compact: React.PropTypes.bool,
    size: React.PropTypes.number,
    offset: React.PropTypes.number,
    ratio: React.PropTypes.number,
    onAvatarClick: React.PropTypes.func,
    onMetricClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      userUrl: '#',
      userImage: '',
      userName: 'User Footprint',
      compact: false,
      size: 144,
      offset: 2,
      ratio: 0.85
    };
  },

  getInitialState: function() {
    var radius = this.props.size / 2;
    return {
      min: radius * this.props.ratio - this.props.offset,
      max: radius - this.props.offset,
      arc: Math.PI * 2 / this.props.data.length,
      metric: null,
      tip: false,
      compact: this.props.compact
    };
  },

  componentDidMount: function() {
    addEventListener(window, 'touchstart', this.setCompact);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'touchstart', this.setCompact);
  },

  tween: function(state, value) {
    this.tweenState(state, {
      easing: tweenState.easingTypes.easeOutQuad,
      delay: 160,
      duration: 320,
      endValue: value
    });
  },

  setCompact: function(e) {
    if (!this.state.compact) this.setState({ compact: true });
    if (!this.getDOMNode().contains(e.target)) {
      this.setMetric(null);
      this.showTip(false);
    }
  },

  shrinkCenter: _.debounce(function(bool) {
    var min = (this.props.size / 2) * this.props.ratio - this.props.offset;
    var scale = this.state.compact ? 0.75 : 0.6;
    if (bool) {
      this.tween('min', min * scale);
    } else {
      this.tween('min', min);
    }
  }, 160),

  setMetric: function(metric) {
    this.shrinkCenter(!!metric);
    this.setState({ metric: metric });
  },

  showTip: function(bool, length, angle) {
    this.setState({ tip: !length ? bool : { length: length, angle: angle } });
  },

  centerTouch: function() {
    this.sectorClick(this.state.metric);
  },

  sectorClick: function(metric) {
    this.props.onMetricClick(metric);
  },

  getOptions: function() {
    return {
      min: this.getTweeningValue('min'),
      max: this.state.max,
      offset: this.props.offset,
      arc: this.state.arc,
      size: this.props.size,
      compact: this.state.compact
    };
  },

  renderGroups: function() {
    return _.map(_.uniq(_.pluck(this.props.data, 'group')), function(d, i) {
      var metrics = _.filter(this.props.data, { 'group': d });
      return <FootprintGroup
        index={ i }
        key={ i + d }
        id={ this.props.userName.replace(/\s+/g, '') }
        name={ d }
        active = { _.contains(metrics, this.state.metric) }
        current={ this.state.metric }
        data={ metrics }
        options={ this.getOptions() }
        onShowTip={ this.showTip }
        onHover={ this.setMetric }
        onClick={ this.sectorClick } />;
    }, this);
  },

  renderTip: function(bool) {
    return bool && (
      <FootprintTip
        key={ 'tip' + this.state.tip.angle }
        metric={ this.state.metric }
        length={ this.state.tip.length }
        angle={ this.state.tip.angle } />
    );
  },

  renderGraph: function(diameter, tip) {
    return (
      <svg width={ this.props.size } height={ this.props.size }>
        { this.renderGroups() }
        { tip && <FootprintTipLine key={ 'line' + this.state.tip.angle } length={ this.state.tip.length } angle={ this.state.tip.angle } /> }
      </svg>
    );
  },

  render: function() {
    var showTip = !!this.state.metric && !!this.state.tip && !this.state.compact;
    var diameter = this.getTweeningValue('min') * 2 - this.props.offset;
    var classes = cx({
      "Footprint": true,
      "Footprint--hover": !!this.state.metric && !!this.state.tip,
      "Footprint--compact": this.state.compact
    });

    return (
      <div className={ classes } style={{ width: this.props.size, height: this.props.size }}>
        { this.renderGraph(diameter, showTip) }
        { this.renderTip(showTip) }
        <FootprintTile
          diameter={ diameter }
          compact={ this.state.compact }
          metric={ this.state.metric }
          url={ this.props.userUrl }
          name={ this.props.userName }
          avatar={ this.props.userImage }
          offset={ this.props.offset }
          onTouch={ this.centerTouch }
          onClick={ this.onAvatarClick } />
      </div>
    );
  }
});
