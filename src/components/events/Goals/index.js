import React from 'react';
import totals from '../../../api/totals';
import CampaignGoalItem from '../GoalItem';

export default React.createClass({
  displayName: 'CampaignGoals',

  getDefaultProps: function() {
    return {
      campaigns: []
    }
  },

  getInitialState: function() {
    return {
      campaigns: []
    }
  },

  componentWillMount: function() {
    var campaignTotals = [];
    var campaignsLength = this.props.campaigns.length;
    var handler = this.handleCampaignTotals;
    this.props.campaigns.map(function(campaign) {
      return totals.findByCampaigns({
        campaignUids: campaign.uid
      }, function(response) {
        campaignTotals.push({
          name: campaign.name,
          goal: campaign.goal,
          count: response.total_amount_cents.count
        })

        if (campaignTotals.length === campaignsLength) {
          handler(campaignTotals);
        }
      })
    })
  },

  handleCampaignTotals: function(campaignTotals) {
    this.setState({
      campaigns: campaignTotals
    })
  },

  renderCampaigns: function() {
    return (
      this.state.campaigns.map(function(campaign) {
        return (
          <CampaignGoalItem name={ campaign.name } goal={ campaign.goal } count={ campaign.count } />
        )
      })
    )
  },

  render: function() {
    return (
      <div className="CampaignGoals__container">
        { this.state.campaigns.length > 0 ? this.renderCampaigns() : null }
      </div>
    )
  }
});
