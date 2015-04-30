"use strict";

var React                = require('react');
var Icon                 = require('../../helpers/Icon');
var PromoCharitiesResult = require('../PromoCharitiesResult');

module.exports = React.createClass({
  displayName: "PromoCharitiesResults",

  renderCharityResults: function() {
    if (this.props.loaded) {
      return this.props.content.map(function(d, i) {
        return (
          <PromoCharitiesResult
            key={ d.id }
            result={ d }
            onSelect={ this.props.onSelect }
            actionLabel={ this.props.actionLabel } />
        );
      }, this);
    }

    return <Icon className="PromoCharitiesResults__loading" icon="refresh" />;
  },

  render: function() {
    return (
      <div className="PromoCharitiesResults">
        { this.renderCharityResults() }
      </div>
    );
  }
});
