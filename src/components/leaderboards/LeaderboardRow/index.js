/** @jsx React.DOM */
"use strict";

var _             = require('lodash');
var React         = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardRow',

  render: function() {
    return (
      <div className="name">
        { this.props.name }: {this.props.amount}
      </div>
    );
  }
});
