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
      <div className="PromoCharitiesResult">
        <a href={ result.url } className="PromoCharitiesResult__link" title={ result.name } onClick={ this.clickHandler }>
          <div className="PromoCharitiesResult__content">
            <img className="PromoCharitiesResult__image" src={ result.logo_url } alt={ result.name } />
          </div>
        </a>
        <a href={ result.url } className="PromoCharitiesResult__btn" title={ result.name } onClick={ this.clickHandler }>
          { this.props.actionLabel }
        </a>
      </div>
    );
  }
});
