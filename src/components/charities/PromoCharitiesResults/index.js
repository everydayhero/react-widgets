/** @jsx React.DOM */
"use strict";

var React                = require('react');
var Icon                 = require('../../helpers/Icon');
var PromoCharitiesResult = require('../PromoCharitiesResult');

module.exports = React.createClass({
  displayName: "PromoCharitiesResults",

  renderCharityResults: function() {
    if (this.props.loaded) {
      return this.props.content.map(function(d, i) {
        return <PromoCharitiesResult key={ d.id } result={ d } onSelect={ this.props.onSelect } />;
      }, this);
    }

    return <Icon className="PromoCharitiesResults__loading" icon="refresh" spin={ true } />;
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
