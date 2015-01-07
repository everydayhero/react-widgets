"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'MMFLeaderboardItem',

  render: function() {
    return (
      <div className="MMFLeaderboardItem">

        <a href={ this.props.url } className="MMFLeaderboardItem__image">
          <img src={ this.props.imgSrc } />
        </a>

        <div className="MMFLeaderboardItem__name">
          { this.props.name }
        </div>

        <div className="MMFLeaderboardItem__amount">
          { this.props.amount }
        </div>

        <div className="MMFLeaderboardItem__time">
          10m 55s
        </div>

        <div className="MMFLeaderboardItem__calories">
          10 Calories
        </div>

        <div className="MMFLeaderboardItem__distance">
          10 km
        </div>

      </div>
    );
  }
});
