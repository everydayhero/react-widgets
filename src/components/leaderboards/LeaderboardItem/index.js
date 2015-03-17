"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardItem',

  render: function() {
    return (
      <div className="LeaderboardItem">
        <div className="LeaderboardItem__skin">
          <a href={ this.props.url } className="LeaderboardItem__image">
            <img src={ this.props.imgSrc } />
          </a>
          <div className="LeaderboardItem__content">
            <div className="LeaderboardItem__name">
              { this.props.name }
            </div>
            <div className="LeaderboardItem__amount">
              { this.props.amount }
            </div>
          </div>
          <div className="LeaderboardItem__rank">
            { this.props.rank }
          </div>
        </div>
      </div>
    );
  }
});
