"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'MMFLeaderboardItem',

  render: function() {
    return (
      <tr className="MMFLeaderboardItem">
        <td className="MMFLeaderboardItem__fundraiser">
          <a href={ this.props.url }>
            <img className="MMFLeaderboardItem__image" src={ this.props.imgSrc } />
            <div className="MMFLeaderboardItem__name">{ this.props.name }</div>
          </a>
        </td>
        <td className="MMFLeaderboardItem__raised">
          { this.props.amount }
        </td>
        <td className="MMFLeaderboardItem__distance">
          { this.props.meters }
        </td>
      </tr>
    );
  }
});
