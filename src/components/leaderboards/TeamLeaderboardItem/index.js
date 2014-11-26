"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'TeamLeaderboardItem',

  render: function() {
    return (
      <li className="TeamLeaderboard__items-item">
        <div className="TeamLeaderboard__items-skin">
          <div className="TeamLeaderboard__items-image">
            <img src={ this.props.imgSrc } />
          </div>
          <div className="TeamLeaderboard__items-content">
            <div className="TeamLeaderboard__items-name">{ this.props.name }</div>
            <div className="TeamLeaderboard__items-stats">
              <div className="TeamLeaderboard__items-stat">
                <div className="TeamLeaderboard__items-stat-content">
                  { this.props.totalMembers }
                  <div className="TeamLeaderboard__items-stat-title">
                    { this.props.membersTitle }
                  </div>
                </div>
              </div>
              <div className="TeamLeaderboard__items-stat">
                <div className="TeamLeaderboard__items-stat-content">
                  { this.props.amount }
                  <div className="TeamLeaderboard__items-stat-title">
                    { this.props.raisedTitle }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
});
