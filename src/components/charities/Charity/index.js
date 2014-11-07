/** @jsx React.DOM */
"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'Charity',

  render: function() {
    return (
      <li className="Charity">
        <div className="Charity__skin">
          <div className="Charity__content">
            <a href={ this.props.url } className="Charity__image" title={ this.props.name }>
              <img src={ this.props.logo_url } alt={ this.props.name } />
            </a>
          </div>
        </div>
      </li>
    );
  }
});
