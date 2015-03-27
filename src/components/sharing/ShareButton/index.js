"use strict";

var React                   = require('react/addons');
var I18nMixin               = require('../../mixins/I18n');
var Icon                    = require('../../helpers/Icon');
var ShareBox                = require('../ShareBox');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "ShareButton",
  propTypes: {
    networks: React.PropTypes.array,
    shareUrl: React.PropTypes.string,
    shareTitle: React.PropTypes.string,
    shareImage: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      networks: [
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

  renderIcon: function() {
    if (this.props.renderIcon) {
      return <Icon className="ShareButton__icon" icon="share" />;
    }
  },

  renderShareBox: function() {
    if (this.state.active) {
      var props = this.props;
      var image = props.shareImage;

      return (
        <ShareBox
          networks={ props.networks }
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
