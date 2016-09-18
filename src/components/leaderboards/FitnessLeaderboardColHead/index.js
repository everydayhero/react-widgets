import React from 'react';
import Icon from '../../helpers/Icon';

export default React.createClass({
  displayName: 'FitnessLeaderboardColHead',

  handleClick: function() {
    this.props.onClick(this.props.sort);
  },

  renderIcon: function() {
    if (this.props.active === true) {
      return <Icon className="FitnessLeaderboardColHead__icon" icon="caret-down" />;
    }
  },

  render: function() {
    return (
      <td className="FitnessLeaderboardColHead" onClick={ this.handleClick }>
        { this.props.name }
        { this.renderIcon() }
      </td>
    );
  }
});
