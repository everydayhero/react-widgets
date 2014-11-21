/** @jsx React.DOM */
"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "PromoCharitiesResult",

  clickHandler: function(event) {
    event.preventDefault();
    this.props.onSelect(this.props.result);
  },

  render: function() {
    var result = this.props.result;

    return (
      <a href={ result.url } className="PromoCharitiesResult" title={ result.name } onClick={ this.clickHandler }>
        <div className="PromoCharitiesResult__skin">
          <div className="PromoCharitiesResult__content">
            <img className="PromoCharitiesResult__image" src={ result.logo_url } alt={ result.name } />
          </div>
        </div>
      </a>
    );
  }
});
