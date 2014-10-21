/** @jsx React.DOM */
"use strict";

var _             = require('lodash');
var React         = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardRow',

  render: function() {
    return (
      <li className="LeaderboardRow">
        <div className="LeaderboardRow__wrapper">
          <div className="LeaderboardRow__field LeaderboardRow__field--truncated">
            <div className="LeaderboardRow__name">{ this.props.name }</div>
          </div>
          <div className="LeaderboardRow__field">
            <div className="LeaderboardRow__code">{this.props.iso_code}</div>
            <div className="LeaderboardRow__total">{this.props.amount}</div>
          </div>
        </div>
      </li>
    );
  }
});
