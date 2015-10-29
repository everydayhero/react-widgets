'use strict';

var React              = require('react');
var campaigns          = require('../../../api/campaigns');
var CallToActionButton = require('../../callstoaction/CallToActionButton');

module.exports = React.createClass({
  displayName: 'LeaderboardEmpty',
  propTypes: {
    emptyText: React.PropTypes.string.isRequired,
    emptyButtonText: React.PropTypes.string.isRequired
  },

  componentWillMount: function() {
    this.fetchGetStartedUrl();
  },

  fetchGetStartedUrl: function() {
    var props            = this.props;
    var slug             = props.campaignSlug;
    var country          = props.country;
    var campaignUid      = this.props.campaignUid || this.props.campaignUids[0];
    var isSingleCampaign = !!props.campaignUid && !this.props.campaignUids;

    if (country && slug) {
      this.setGetStartedUrl(slug, country, isSingleCampaign);
    } else {
      this.setState({ isLoading: true });
      campaigns.find(campaignUid, function(res) {
        this.setGetStartedUrl(res.campaign.slug, res.campaign.country_code, isSingleCampaign);
      }.bind(this));
    }
  },

  setGetStartedUrl: function(slug, country, singleCampaign) {
    var getStartedUrl = 'https://' + slug + '.everydayhero.com/' + country + '/get-started';
    var genericUrl = 'https://everydayhero.com/' + country + '/sign-up';

    this.setState({
      isLoading: false,
      getStartedUrl: slug && country && singleCampaign ?  getStartedUrl : genericUrl
    });
  },

  render: function() {
    return (
      <div className="LeaderboardEmpty">
        <p className="LeaderboardEmpty__content">
          { this.props.emptyText }
        </p>
        <CallToActionButton kind="secondary" href={ this.state.getStartedUrl } className="LeaderboardEmpty__cta">
          { this.props.emptyButtonText }
        </CallToActionButton>
      </div>
    );
  }
});
