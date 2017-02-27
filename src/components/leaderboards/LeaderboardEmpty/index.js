import React from 'react'
import campaigns from '../../../api/campaigns'
import CallToActionButton from '../../callstoaction/CallToActionButton'

export default React.createClass({
  displayName: 'LeaderboardEmpty',
  propTypes: {
    emptyText: React.PropTypes.string.isRequired,
    emptyButtonText: React.PropTypes.string
  },

  componentWillMount: function () {
    this.fetchGetStartedUrl()
  },

  fetchGetStartedUrl: function () {
    const {
      campaignSlug,
      country,
      campaignUid,
      campaignUids
    } = this.props

    const uid = campaignUid || (campaignUids && campaignUids[0])
    const isSingleCampaign = !!campaignUid && !campaignUids

    if (country && campaignSlug) {
      this.setGetStartedUrl(campaignSlug, country, isSingleCampaign)
    } else if (uid) {
      this.setState({ isLoading: true })
      campaigns.find(campaignUid, function (res) {
        this.setGetStartedUrl(res.campaign.slug, res.campaign.country_code, isSingleCampaign)
      }.bind(this))
    } else {
      this.setGetStartedUrl(null, country)
    }
  },

  setGetStartedUrl: function (slug, country, singleCampaign) {
    var getStartedUrl = 'https://' + slug + '.everydayhero.com/' + country + '/get-started'
    var genericUrl = 'https://everydayhero.com/' + country + '/sign-up'

    this.setState({
      isLoading: false,
      getStartedUrl: slug && country && singleCampaign ? getStartedUrl : genericUrl
    })
  },

  render: function () {
    return (
      <div className='LeaderboardEmpty'>
        <p className='LeaderboardEmpty__content'>
          { this.props.emptyText }
        </p>
        <CallToActionButton kind='secondary' href={this.state.getStartedUrl} className='LeaderboardEmpty__cta'>
          { this.props.emptyButtonText }
        </CallToActionButton>
      </div>
    )
  }
})
