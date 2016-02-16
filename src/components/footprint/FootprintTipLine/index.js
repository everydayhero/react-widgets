"use strict";

var React      = require('react');
var tweenState = require('react-tween-state');
var line       = require('paths-js/path');

module.exports = React.createClass({
  mixins: [tweenState.Mixin],

  displayName: 'FootprintTipLine',

  propTypes: {
    length: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      length: 0
    };
  },

  componentDidMount: function() {
    this.tweenState('length', {
      easing: tweenState.easingTypes.easeInQuad,
      duration: 320,
      delay: 160,
      beginValue: 0,
      endValue: this.props.length
    });
  },

  render: function() {
    var length = this.getTweeningValue('length');
    var draw = length + (length * (Math.sqrt(2) - 1));
    var x = draw * Math.cos(this.props.angle);
    var y = draw * Math.sin(this.props.angle);
    var path = line().moveto(0, 0).lineto(x, y);
    var center = 'translate(' + this.props.length + ',' + this.props.length + ')';

    return <path transform={ center } className="FootprintTipLine" d={ path.print() } />;
  }
});
