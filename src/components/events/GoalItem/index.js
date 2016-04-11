var React = require('react');

module.exports = React.createClass({
  displayName: 'CampaignGoalItem',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    goal: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired
  },

  render: function() {
    var percentage = Math.max(Math.min(this.props.count / this.props.goal * 100, 100), 0);

    return (
      <div className="CampaignGoal__container">
        <div className="CampaignGoal__item">
          <div className="CampaignGoal__bar" style={ { height: (percentage * 3) + 'px' } } ></div>
        </div>
          <div className="CampaignGoal__title">{ this.props.name }</div>
      </div>
    )
  }
})
