'use strict';

var React               = require('react');
var ReactDOM            = require('react-dom');
var cx                  = require('classnames');
var _                   = require('lodash');
var tweenState          = require('react-tween-state');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');
var I18nMixin           = require('../../mixins/I18n');
var FootprintGroup      = require('../FootprintGroup');
var FootprintTile       = require('../FootprintTile');
var FootprintTip        = require('../FootprintTip');
var FootprintTipLine    = require('../FootprintTipLine');

module.exports = React.createClass({
  displayName: 'Footprint',

  mixins: [tweenState.Mixin, I18nMixin],

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
      ratio: 0.85,
      onAvatarClick: function() {},
      onMetricClick: function() {},
      defaultI18n: {
        community: {
          cause_engagement: {
            title: 'Community Engagement',
            description: 'The number of people who share a passion for the same causes.'
          },
          cause_raised: {
            title: 'Community Raised',
            description: 'The collective funds raised by the people who care about the same causes.'
          }
        },
        effort: {
          duration_volunteered: {
            title: 'Duration Volunteered',
            description: 'A record of the hours spent helping their favourite causes.'
          },
          duration_trained: {
            title: 'Duration Trained',
            description: 'A record of the distance, time and calories spent supporting their favourite causes.'
          }
        },
        voice: {
          sharing: {
            title: 'Sharing',
            description: 'The number of times their story has been shared.'
          },
          page_views: {
            title: 'Page Views',
            description: 'Recognition of the awareness they have raised for the causes they care about.'
          }
        },
        money: {
          given: {
            title: 'Amount Given',
            description: 'A lifetime record of the donations made to the causes they care about.'
          },
          raised: {
            title: 'Amount Raised',
            description: 'A lifetime record of the money raised through the fundraising activities they undertook for their favourite causes.'
          }
        }
      }
    };
  },

  getInitialState: function() {
    var radius = this.props.size / 2;
    return {
      min: radius * this.props.ratio - this.props.offset,
      max: radius - this.props.offset,
      metric: null,
      tip: false,
      compact: this.props.compact
    };
  },

  processData: function() {
    var data = this.props.data.map(function(metric, index) {
      return {
        id: index,
        key: metric.key,
        group: metric.group,
        value: metric.amount_formatted,
        percentile: metric.percentile,
        name: this.t(metric.group + '.' + metric.key + '.title'),
        description: this.t(metric.group + '.' + metric.key + '.description')
      };
    }.bind(this));

    this.setState({
      data: data,
      arc: data.length > 0 ? Math.PI * 2 / data.length : 0
    });
  },

  componentWillReceiveProps: function() {
    this.processData();
  },

  componentWillMount: function() {
    this.processData();
    addEventListener('touchstart', this.setCompact);
  },

  componentWillUnmount: function() {
    removeEventListener('touchstart', this.setCompact);
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
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
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
    var options = this.getOptions();
    return _.map(_.uniq(_.map(this.state.data, 'group')), (d, i) => {
      var metrics = _.filter(this.state.data, { 'group': d });
      return <FootprintGroup
        index={ i }
        key={ i + d }
        id={ this.props.userName.replace(/\W/g, '') }
        name={ d }
        active = { _.includes(metrics, this.state.metric) }
        current={ this.state.metric }
        data={ metrics }
        options={ options }
        onShowTip={ this.showTip }
        onHover={ this.setMetric }
        onClick={ this.sectorClick } />;
    });
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
      "Footprint--hover": !!this.state.metric,
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
