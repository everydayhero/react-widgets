"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var I18nMixin               = require('../../mixins/I18n');
var Icon                    = require('../../helpers/Icon');
var ShareBox                = require('../ShareBox');
var format                  = require('../../../lib/format');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var serviceConfigs = [
  {
    name: "facebook",
    url: "http://www.facebook.com/sharer.php?u={url}"
  },
  {
    name: "twitter",
    url: "https://twitter.com/share?url={url}&text={title}"
  },
  {
    name: "googleplus",
    url: "https://plus.google.com/share?url={url}",
    icon: "google-plus"
  },
  {
    name: "pinterest",
    url: "https://pinterest.com/pin/create/bookmarklet/?media={img}&url={url}&description={title}"
  }
];

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "ShareButton",
  propTypes: {
    buttons: React.PropTypes.array,
    shareUrl: React.PropTypes.string,
    shareTitle: React.PropTypes.string,
    shareImage: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      buttons: [
        'facebook',
        'twitter',
        'googleplus',
        'pinterest'
      ],
      shareUrl: window.location.href,
      shareTitle: document.title,
      shareImage: '',
      renderIcon: true,
      defaultI18n: {
        buttonLabel: 'Share this page',
        shareLinkLabel: 'Share a direct link',
        shareViaLabel: 'Share via'
      }
    };
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  toggleActive: function() {
    this.setState({ active: !this.state.active });
  },

  filterServices: function() {
    var filteredServices = [];

    _.forEach(this.props.buttons, function(name) {
      filteredServices.push(_.findWhere(serviceConfigs, { 'name': name }));
    });

    return filteredServices;
  },

  formatServiceUrls: function(services) {
    return _.forEach(services, function(service) {
      service.url = format(service.url, {
        "url": this.props.shareUrl,
        "title": this.props.shareTitle,
        "img": this.props.shareImage
      }, true);
    }, this);
  },

  renderIcon: function() {
    if (this.props.renderIcon) {
      return <Icon className="ShareButton__icon" icon="share" />;
    }
  },

  renderShareBox: function() {
    if (this.state.active) {
      var props    = this.props;
      var image    = props.shareImage;
      var services = this.filterServices();

      this.formatServiceUrls(services);

      return (
        <ShareBox
          services={ services }
          shareUrl={ props.shareUrl }
          shareTitle={ props.shareTitle }
          shareImage={ image }
          shareLinkLabel={ this.t('shareLinkLabel') }
          shareViaLabel={ this.t('shareViaLabel') }  />
      );
    }
  },

  render: function() {
    var buttonLabel = this.t('buttonLabel');

    return (
      <div className="ShareButton">
        <div className="ShareButton__btn" onClick={ this.toggleActive }>
          { this.renderIcon() }
          <span className="ShareButton__label">{ buttonLabel }</span>
        </div>
        <ReactCSSTransitionGroup transitionName="ShareButton__transition" transitionEnter={ false }>
          { this.renderShareBox() }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
