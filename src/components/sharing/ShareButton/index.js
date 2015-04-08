"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var I18nMixin               = require('../../mixins/I18n');
var Icon                    = require('../../helpers/Icon');
var ShareBox                = require('../ShareBox');
var format                  = require('../../../lib/format');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var addEventListener        = require('../../../lib/addEventListener');
var removeEventListener     = require('../../../lib/removeEventListener');

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
  displayName: "ShareButton",
  mixins: [I18nMixin],
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
      buttons: _.pluck(serviceConfigs, 'name'),
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
    return { open: false };
  },

  open: function() {
    this.setState({ open: true });
    document.addEventListener('click', this.close);
  },

  close: function() {
    this.setState({ open: false });
    document.removeEventListener('click', this.close);
  },

  filterServices: function() {
    return _.map(this.props.buttons, function(name) {
      return _.findWhere(serviceConfigs, { 'name': name });
    });
  },

  formatServiceUrls: function(services) {
    var urlParams = {
      "url": this.props.shareUrl,
      "title": this.props.shareTitle,
      "img": this.props.shareImage
    };

    return _.map(services, function(service) {
      return {
        name: service.name,
        icon: service.icon,
        url: format(service.url, urlParams, true)
      };
    }, this);
  },

  renderIcon: function() {
    if (this.props.renderIcon) {
      return <Icon className="ShareButton__icon" icon="share" />;
    }
  },

  renderShareBox: function() {
    if (this.state.open) {
      var props    = this.props;
      var image    = props.shareImage;
      var services = this.filterServices();

      services = this.formatServiceUrls(services);

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
        <div className="ShareButton__btn" onClick={ this.open }>
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
