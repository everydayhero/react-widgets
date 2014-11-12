/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "PromoCharitiesContent",

  renderCharity: function() {
    return this.props.content.map(function(d, i) {
      return (
        <a href={ d.url } className="PromoCharitiesContent__charity" title={ d.name }>
          <div className="PromoCharitiesContent__charity-skin">
            <div className="PromoCharitiesContent__content">
              <img className="PromoCharitiesContent__image" src={ d.logo_url } alt={ d.name } />
            </div>
          </div>
        </a>
      );
    }, this);
  },

  render: function() {
    var active = this.props.active ? " active" : '';

    return (
      <div className={ "PromoCharitiesContent" + active }>
        <div className="PromoCharitiesContent__charities">
          { this.renderCharity() }
        </div>
      </div>
    );
  }
});
