"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "PromoCharitiesResult",
  propTypes: {
    actionLabel: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    url: React.PropTypes.string,
    result: React.PropTypes.object
  },

  clickHandler: function(event) {
    event.preventDefault();
    this.props.onSelect(this.props.result);
  },

  render: function() {
    var result = this.props.result;

    return (
      <div className="PromoCharitiesResult">
        <a href={ this.props.url } className="PromoCharitiesResult__link" title={ result.name } onClick={ this.clickHandler }>
          <div className="PromoCharitiesResult__content">
            <img className="PromoCharitiesResult__image" src={ result.logo_url } alt={ result.name } />
          </div>
        </a>
        <a href={ this.props.url } className="PromoCharitiesResult__btn" title={ result.name } onClick={ this.clickHandler }>
          { this.props.actionLabel }
        </a>
      </div>
    );
  }
});
