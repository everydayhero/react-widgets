import React from 'react'
import I18nMixin from '../../mixins/I18n'
import Icon from '../../helpers/Icon'
import campaigns from '../../../api/campaigns'
import CallToActionButton from '../CallToActionButton'

export default React.createClass({
  mixins: [I18nMixin],
  displayName: 'CallToActionBox',
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    registrationUrl: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      campaignUid: '',
      registrationUrl: '',
      backgroundColor: null,
      textColor: null,
      defaultI18n: {
        title: 'Get Involved',
        registerLabel: 'Register Now',
        getStartedLabel: 'Start Fundraising',
        signInLabel: 'Sign in'
      }
    }
  },

  getInitialState: function () {
    return {
      isLoading: false,
      country_code: '',
      slug: ''
    }
  },

  componentWillMount: function () {
    this.setState({
      isLoading: true
    })

    var props = this.props

    campaigns.find(props.campaignUid, this.onSuccess)
  },

  onSuccess: function (result) {
    this.setState({
      isLoading: false,
      country_code: result.campaign.country_code,
      slug: result.campaign.slug
    })
  },

  renderContent: function () {
    var slug = this.state.slug
    var countryCode = this.state.country_code
    var registrationUrl = this.props.registrationUrl
    var campaignUrl = 'https://' + slug + '.everydayhero.com/' + countryCode + '/'
    var signInUrl = campaignUrl + 'sign-in'
    var getStartedUrl = campaignUrl + 'get-started'

    var title = this.t('title')
    var registerLabel = this.t('registerLabel')
    var getStartedLabel = this.t('getStartedLabel')
    var signInLabel = this.t('signInLabel')

    if (this.state.isLoading) {
      return <Icon className='CallToActionBox__loading' icon='refresh' />
    }

    return (
      <div>
        <div className='CallToActionBox__title'>{ title }</div>
        <CallToActionButton kind='primary' reverse href={registrationUrl} label={registerLabel} />
        <hr />
        <p>Already Registered? <a href={signInUrl} target='_top' className='CallToActionBox__link'>{ signInLabel }</a></p>
        <CallToActionButton kind='primary' reverse href={getStartedUrl} label={getStartedLabel} />
      </div>
    )
  },

  render: function () {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={'CallToActionBox'} style={customStyle}>
        { this.renderContent() }
      </div>
    )
  }
})
