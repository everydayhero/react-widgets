var React = require('react');
var totals = require('../../../api/totals');
var merge = require('lodash/object/merge');
var Promise = require('bluebird');

module.exports = React.createClass({
  displayName: 'CampaignGoals',

  getDefaultProps: function() {
    return {
      campaignUids: []
    }
  },

  getInitialState: function() {
    return {
      campaigns: []
    }
  },

  componentWillMount: function() {
    var campaigns = [];
    var reqs = this.props.campaignUids.map(function(campaignUid) {
      return totals.findByCampaigns({
        campaignUids: campaignUid
      }).then(function(response) {
        campaigns.push({
          uid: campaignUid,
          count: response.total_amount_cents.count
        })
      })
    })

    Promise.all(reqs).then(function() {
      this.props.onData(campaigns)
      this.setState({
        campaigns
      })
    }.bind(this))
  },

  render: function() {
    return <div />;
  }
})
