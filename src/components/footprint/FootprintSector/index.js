"use strict";

var React      = require('react/addons');
var cx         = require('react/lib/cx');

module.exports = React.createClass({
  displayName: 'FootprintSector',

  propTypes: {
    index: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    metric: React.PropTypes.object.isRequired,
    sector: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool,
    dummy: React.PropTypes.object,
    offset: React.PropTypes.number,
    onHover: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  handleClick: function() {
    this.props.onClick(this.props.metric);
  },

  handleEnter: function() {
    this.props.onHover(this.props.metric);
  },

  handleLeave: function() {
    this.props.onHover(null);
  },

  render: function() {
    var maskID = 'mask' + this.props.index + this.props.id;
    var maskStyle = {
      fill: 'white',
      strokeWidth: this.props.offset,
      stroke: 'black'
    };
    var classes = cx({
      "FootprintSector": true,
      "FootprintSector--active": this.props.active
    });

    return (
      <g className={ classes }
        onMouseEnter={ this.handleEnter }
        onMouseLeave={ this.handleLeave }
        onTouchStart={ this.handleEnter }
        onClick={ this.handleClick } >

        <defs>
          <mask id={ maskID } x="0" y="0" width="100" height="100" >
            <path className="FootprintMask" d={ this.props.dummy.path.print() } style={ maskStyle } />
          </mask>
        </defs>

        <path className="FootprintDummy" d={ this.props.dummy.path.print() } style={{ mask: 'url(#' + maskID + ')' }}/>

        <path className={ "FootprintMetric FootprintMetric--" + this.props.name } d={ this.props.sector.path.print() } style={{ mask: 'url(#' + maskID + ')' }}/>
      </g>
    );
  }
});
