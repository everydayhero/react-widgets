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
    services: React.PropTypes.array,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  /*
   * Check out:
   * https://github.com/vweevers/share-dialog/blob/master/index.js
   * https://github.com/vutran/share.js/blob/master/src/share.js
   */
  getDefaultProps: function() {
    return {
      services: [
        'link',
        'email',
        'facebook',
        'twitter',
        'googleplus',
        'tumblr',
        'pinterest',
        'reddit',
        'linkedin'
      ],
      renderIcon: true,
      defaultI18n: {
        buttonLabel: 'Share this page',
        shareLinkLabel: 'Share a direct link'
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
      return (
        <ShareBox
          services={ this.props.services }
          shareLinkLabel={ this.t('shareLinkLabel') } />
      );
    }
  },

  render: function() {
    var buttonLabel = this.t('buttonLabel');

    return (
      <div className="ShareButton" onClick={ this.toggleActive }>
        { this.renderIcon() }
        <span className="ShareButton__label">{ buttonLabel }</span>
        <ReactCSSTransitionGroup transitionName="ShareButton__transition" transitionEnter={ false }>
          { this.renderShareBox() }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
