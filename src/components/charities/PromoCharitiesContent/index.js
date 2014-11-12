/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "PromoCharitiesContent",

  renderCharity: function() {
    return this.props.content.map(function(d, i) {
      return (
        <div className="PromoCharitiesContent__charity">
          <div className="PromoCharitiesContent__charity-skin">
            <div className="PromoCharitiesContent__content">
              <a href={ d.url } className="PromoCharitiesContent__image" title={ d.name }>
                <img src={ d.logo_url } alt={ d.name } />
              </a>
            </div>
          </div>
        </div>
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
