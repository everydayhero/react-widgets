"use strict";

var React = require('react');
var Icon  = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: 'MMFLeaderboardColHead',

  handleClick: function() {
    this.props.onClick(this.props.sort);
  },

  renderIcon: function() {
    if (this.props.active === true) {
      return <Icon className="MMFLeaderboardColHead__icon" icon="caret-down" />;
    }
  },

  render: function() {
    return (
      <td className="MMFLeaderboardColHead" onClick={ this.handleClick }>
        { this.props.name }
        { this.renderIcon() }
      </td>
    );
  }
});
