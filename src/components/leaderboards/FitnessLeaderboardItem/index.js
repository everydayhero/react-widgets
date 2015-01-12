"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'FitnessLeaderboardItem',

  render: function() {
    return (
      <tr className="FitnessLeaderboardItem">
        <td className="FitnessLeaderboardItem__fundraiser">
          <a href={ this.props.url }>
            <img className="FitnessLeaderboardItem__image" src={ this.props.imgSrc } />
            <div className="FitnessLeaderboardItem__name">{ this.props.name }</div>
          </a>
        </td>
        <td className="FitnessLeaderboardItem__raised">
          { this.props.amount }
        </td>
        <td className="FitnessLeaderboardItem__distance">
          { this.props.meters }
        </td>
      </tr>
    );
  }
});
