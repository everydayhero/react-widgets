/** @jsx React.DOM */
"use strict";

var React                = require('react');
var PromoCharitiesResult = require('../PromoCharitiesResult');

module.exports = React.createClass({
  displayName: "PromoCharitiesResults",

  renderCharityResults: function() {
    return this.props.content.map(function(d, i) {
      return (
        <PromoCharitiesResult key={ d.id } result={ d } onSelect={ this.props.onSelect } />
      );
    }, this);
  },

  render: function() {
    var active = this.props.active ? " active" : '';

    return (
      <div className={ "PromoCharitiesResults" + active }>
        <div className="PromoCharitiesResults__inner">
          { this.renderCharityResults() }
        </div>
      </div>
    );
  }
});
