import React from 'react'
import I18n from '../../mixins/I18n'
import CallToActionButton from '../../callstoaction/CallToActionButton'
import numeral from 'numbro'

function cssUrl (url) {
  return url ? 'url(' + url + ')' : 'none'
}

export default React.createClass({
  displayName: 'Event',
  mixins: [I18n],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    campaignUrl: React.PropTypes.string,
    donateUrl: React.PropTypes.string,
    getStartedUrl: React.PropTypes.string,
    backgroundImageUrl: React.PropTypes.string,
    backgroundBlurUrl: React.PropTypes.string,
    supporterCount: React.PropTypes.number.isRequired,
    centsRaised: React.PropTypes.number,
    currencySymbol: React.PropTypes.string,
    width: React.PropTypes.string.isRequired,
    target: React.PropTypes.oneOf(['_top', '_parent', '_self', '_blank']),
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      target: '_top',
      defaultI18n: {
        joinLabel: 'Join Event',
        donateLabel: 'Give Now',
        joinLabelShort: 'Join',
        donateLabelShort: 'Give',
        supportersLabel: 'Supporters',
        raisedLabel: 'Raised',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  },

  getInitialState: function () {
    return {
      activeClass: ''
    }
  },

  activate: function () {
    this.setState({ activeClass: 'active' })
  },

  activateAndTimeout: function () {
    this.activate()
    this.timeout()
  },

  timeout: function () {
    var component = this
    setTimeout(function () { component.deactivate() }, 2500)
  },

  deactivate: function () {
    this.setState({ activeClass: '' })
  },

  eventStyles: function () {
    return {
      width: this.props.width
    }
  },

  renderCallToAction: function () {
    var donateUrl = this.props.donateUrl
    var getStartedUrl = this.props.getStartedUrl
    var supporterCount = this.props.supporterCount
    var centsRaised = this.props.centsRaised
    var currencySymbol = this.props.currencySymbol

    var donateLabel = donateUrl && getStartedUrl ? this.t('donateLabelShort') : this.t('donateLabel')
    var joinLabel = donateUrl && getStartedUrl ? this.t('joinLabelShort') : this.t('joinLabel')
    var formattedRasied = numeral((centsRaised || 0) / 100).format('(' + currencySymbol + '0a)')

    return (
      <div className='Event__calls-to-action'>
        { !!getStartedUrl &&
          <div className='Event__call-to-action'>
            <div className='Event__call-to-action-stat'>
              { supporterCount } { this.t('supportersLabel') }
            </div>
            <CallToActionButton
              kind='secondary'
              reverse
              href={getStartedUrl}
              target={this.props.target}
              className='Event__block-button'>
              { joinLabel }
            </CallToActionButton>
          </div> }
        { !!donateUrl &&
          <div className='Event__call-to-action'>
            <div className='Event__call-to-action-stat'>
              { formattedRasied } { this.t('raisedLabel') }
            </div>
            <CallToActionButton
              kind='secondary'
              reverse
              href={donateUrl}
              target={this.props.target}
              className='Event__block-button'>
              { donateLabel }
            </CallToActionButton>
          </div> }
      </div>
    )
  },

  render: function () {
    var props = this.props
    var date = props.date
    var bg = cssUrl(props.backgroundImageUrl)
    var blur = cssUrl(props.backgroundBlurUrl)
    var t = this.t

    return (
      <div className='Event' style={this.eventStyles()}
        onTouchStart={this.activateAndTimeout}
        onTouchCancel={this.deactivate}
        onMouseEnter={this.activate}
        onMouseLeave={this.deactivate}>
        <div className={'Event__base ' + this.state.activeClass} style={{ backgroundImage: bg }}>
          <div className='Event__blur' style={{ backgroundImage: blur }} />
          <div className='Event__gradient' />
          {props.date &&
            <ul className='Event__date DateBox'>
              <li className='DateBox__day'>
                {/* Heroix/NFP does *not* store dates with Timezone information. This means the 'utc' date we receive
                    is actually the date as selected by the user in NFP or Heroix when configuring the campaign. If
                    we don't use getUTCDate javascript will helpfully convert to the browser's locale, meaning in the US
                    they see dates one day earlier than they selected when configuring the campaign.
                 */
                }
                {date.getUTCDate()}
              </li>
              <li className='DateBox__month-year'>
                {t('months')[date.getUTCMonth()]} {date.getUTCFullYear()}
              </li>
            </ul>
          }
          <a className='Event__name' target={props.target} href={props.campaignUrl}>{ props.name }</a>
          { this.renderCallToAction() }
        </div>
      </div>
    )
  }
})
