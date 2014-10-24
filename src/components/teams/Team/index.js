/** @jsx React.DOM */
"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'Team',

  render: function() {
    return (
      <a href={ this.props.pageUrl } title={ this.props.title } className="Team">
        <img src={ this.props.imgSrc } alt={ this.props.title } />
        <p>{ this.props.title }</p>
      </a>
    )
  }
});
