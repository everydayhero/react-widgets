import _ from 'lodash'
import React from 'react'
import I18nMixin from '../../mixins/I18n'
import Icon from '../../helpers/Icon'
import ShareBox from '../ShareBox'
import format from '../../../lib/format'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import addEventListener from '../../../lib/addEventListener'
import removeEventListener from '../../../lib/removeEventListener'

var serviceConfigs = [
  {
    name: 'facebook',
    url: 'http://www.facebook.com/sharer.php?u={url}'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/share?url={url}&text={title}'
  },
  {
    name: 'googleplus',
    url: 'https://plus.google.com/share?url={url}',
    icon: 'google-plus'
  },
  {
    name: 'pinterest',
    url: 'https://pinterest.com/pin/create/bookmarklet/?media={img}&url={url}&description={title}'
  }
]

export default React.createClass({
  displayName: 'ShareButton',
  mixins: [I18nMixin],
  propTypes: {
    buttons: React.PropTypes.array,
    shareUrl: React.PropTypes.string,
    shareTitle: React.PropTypes.string,
    shareImage: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      buttons: _.map(serviceConfigs, 'name'),
      shareUrl: window.location.href,
      shareTitle: document.title,
      shareImage: '',
      renderIcon: true,
      defaultI18n: {
        buttonLabel: 'Share this page',
        shareLinkLabel: 'Share a direct link',
        shareViaLabel: 'Share via'
      }
    }
  },

  getInitialState: function () {
    return { open: false }
  },

  open: function () {
    this.setState({ open: true })
    addEventListener('click', this.close, document)
  },

  close: function () {
    this.setState({ open: false })
    removeEventListener('click', this.close, document)
  },

  filterServices: function () {
    return _.map(this.props.buttons, function (name) {
      return _.find(serviceConfigs, { 'name': name })
    })
  },

  formatServiceUrls: function (services) {
    var urlParams = {
      'url': this.props.shareUrl,
      'title': this.props.shareTitle,
      'img': this.props.shareImage
    }

    return _.map(services, function (service) {
      return {
        name: service.name,
        icon: service.icon,
        url: format(service.url, urlParams, true)
      }
    })
  },

  renderIcon: function () {
    if (this.props.renderIcon) {
      return <Icon className='ShareButton__icon' icon='share' />
    }
  },

  renderShareBox: function () {
    if (this.state.open) {
      var props = this.props
      var image = props.shareImage
      var services = this.filterServices()

      services = this.formatServiceUrls(services)

      return (
        <ShareBox
          services={services}
          shareUrl={props.shareUrl}
          shareTitle={props.shareTitle}
          shareImage={image}
          shareLinkLabel={this.t('shareLinkLabel')}
          shareViaLabel={this.t('shareViaLabel')} />
      )
    }
  },

  render: function () {
    var buttonLabel = this.t('buttonLabel')

    return (
      <div className='ShareButton'>
        <div className='ShareButton__btn' onClick={this.open}>
          { this.renderIcon() }
          <span className='ShareButton__label'>{ buttonLabel }</span>
        </div>
        <ReactCSSTransitionGroup transitionName='ShareButton__transition' transitionEnter={false}>
          { this.renderShareBox() }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})
