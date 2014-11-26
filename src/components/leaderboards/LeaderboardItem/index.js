"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardItem',

  render: function() {
    return (
      <li className="LeaderboardItem">
        <div className="LeaderboardItem__skin">
          <div className="LeaderboardItem__image">
            <img src={ this.props.imgSrc } />
          </div>
          <div className="LeaderboardItem__content">
            <div className="LeaderboardItem__details">
              <div className="LeaderboardItem__name">
                { this.props.name }
              </div>
              <div className="LeaderboardItem__rank">
                { this.props.rankTitle + ' ' + this.props.rank }
              </div>
            </div>
            <div className="LeaderboardItem__amount">
              { this.props.amount }
            </div>
          </div>
        </div>
      </li>
    );
  }
});
