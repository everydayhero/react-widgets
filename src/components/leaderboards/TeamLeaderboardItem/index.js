"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'TeamLeaderboardItem',

  propTypes: {
    imgSrc: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    totalMembers: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    isoCode: React.PropTypes.string.isRequired,
    amount: React.PropTypes.string.isRequired,
    raisedTitle: React.PropTypes.string.isRequired,
    membersTitle: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired
  },

  render: function() {
    var style = {
      width: this.props.width
    };

    return (
      <li className="TeamLeaderboard__items-item" style={ style }>
        <div className="TeamLeaderboard__items-skin">
          <a href={ this.props.url } className="TeamLeaderboard__items-image">
            <img src={ this.props.imgSrc } />
          </a>
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
