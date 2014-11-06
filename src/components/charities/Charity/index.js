/** @jsx React.DOM */
"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'Charity',

  render: function() {
    return (
      <li className="Charity">
        <div className="Charity__skin">
          <div className="Charity__image">
            <img src={ this.props.logo_url } />
          </div>
          <div className="Charity__content">
            <div className="Charity__details">
              <div className="Charity__name">
                { this.props.name }
              </div>
              <div className="Charity__desc">
                { this.props.description }
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
});
