var React = require('react');
var totals = require('../../../api/totals');

module.exports = React.createClass({
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
          uid: campaign.uid,
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
          <div key={ campaign.uid } className="CampaignGoals__item">{ campaign.count }</div>
        )
      })
    )
  },

  render: function() {
    return (
      <div>
        { this.state.campaigns.length > 0 ? this.renderCampaigns() : null }
      </div>
    )
  }
})
