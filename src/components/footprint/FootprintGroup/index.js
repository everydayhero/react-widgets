import React from 'react';
import cx from 'classnames';
import tweenState from 'react-tween-state';
import sector from 'paths-js/sector';
import FootprintSector from '../FootprintSector';

export default React.createClass({
  displayName: 'FootprintGroup',

  mixins: [tweenState.Mixin],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    compact: React.PropTypes.bool,
    current: React.PropTypes.object,
    data: React.PropTypes.array.isRequired,
    options: React.PropTypes.object.isRequired,
    onShowTip: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      active: false,
      compact: false
    };
  },

  getInitialState: function() {
    return {
      offset: 0,
      centerAngle: this.props.options.arc * (this.props.data.length * this.props.index - (this.props.data.length / 2))
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.active) {
      this.tween('offset', this.props.options.offset);
    } else {
      this.tween('offset', 0);
    }
  },

  tween: function(state, value) {
    this.tweenState(state, {
      easing: tweenState.easingTypes.easeOutQuad,
      duration: 320,
      endValue: value
    });
  },

  expand: function() {
    return this.props.compact ? this.props.onShowTip(true) : this.props.onShowTip(true, this.props.options.size / 2, this.state.centerAngle);
  },

  contract: function() {
    this.props.onShowTip(false);
  },

  renderSectors: function() {
    return this.props.data.map(function(d) {
      var start = this.props.options.arc * (d.id);
      var end = start + this.props.options.arc;
      var min = this.props.options.min + this.getTweeningValue('offset');
      var max = this.props.options.max + this.getTweeningValue('offset');
      var path = sector({
        center: [0, 0],
        r: min,
        R: (d.percentile / 100 * (max - min)) + min,
        start: start,
        end: end
      });
      var dummy = sector({
        center: [0, 0],
        r: this.props.options.min,
        R: this.props.options.max + this.props.options.offset,
        start: start,
        end: end
      }, this);
      return (<FootprintSector
        key={ this.props.id + '_' + d.id}
        index={ d.id }
        id={ this.props.id }
        name={ d.key }
        label={ d.name }
        metric={ d }
        active={ d === this.props.current }
        sector={ path }
        dummy={ dummy }
        offset={ this.props.options.offset }
        onHover={ this.props.onHover }
        onClick={ this.props.onClick } />);
    }, this);
  },

  render: function() {
    var radius = this.props.options.size / 2;
    var centerGraph = 'translate(' + radius + ',' + radius + ')';
    var classes = cx({
      'FootprintGroup': true,
      'FootprintGroup--active': this.props.active
    });

    return (
      <g className={ classes }
        transform={ centerGraph }
        onMouseLeave={ this.contract }
        onMouseEnter={ this.expand }
        onTouchStart={ this.expand }>
        { this.renderSectors() }
      </g>
    );
  }
});
