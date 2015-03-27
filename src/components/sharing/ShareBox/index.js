"use strict";

var _           = require('lodash');
var React       = require('react');
var I18nMixin   = require('../../mixins/I18n');
var Input       = require('../../forms/Input');
var ShareIcon   = require('../ShareIcon');

module.exports = React.createClass({
  displayName: "ShareBox",

  toString: function(obj) {
    return _.map(obj, function(value, key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).join(',');
  },

  openDialog: function(url) {
    var config = {
      toolbar: 0,
      status: 0,
      width: 640,
      height: 320
    };

    var windowTop  = window.screenTop ? window.screenTop : window.screenY;
    var windowLeft = window.screenLeft ? window.screenLeft : window.screenX;

    config.top  = windowTop + (window.innerHeight / 2) - (config.height / 2);
    config.left = windowLeft + (window.innerWidth / 2) - (config.width / 2);
    config      = this.toString(config);

    var windowRef = window.open(url, 'shareWindow', config);
  },

  renderShareIcons: function() {
    return this.props.services.map(function(service) {
      return (
        <ShareIcon
          key={ service.name }
          name={ service.name }
          icon={ service.icon || service.name }
          open={ this.openDialog.bind(null, service.url) } />
      );
    }, this);
  },

  render: function() {
    var shareLinkLabel = this.props.shareLinkLabel;

    return (
      <div className="ShareBox">
        <Input
          readOnly={ true }
          autoSelect={ true }
          type="url"
          icon="link"
          value={ this.props.shareUrl }
          i18n={{ label: shareLinkLabel }}
          spacing="compact" />

          <div className="ShareBox__divider">
            <span>Or</span>
          </div>

          <div className="ShareBox__services">
            <label>Share via</label>
            <div className="ShareBox__icons">
              { this.renderShareIcons() }
            </div>
          </div>
      </div>
    );
  }
});
