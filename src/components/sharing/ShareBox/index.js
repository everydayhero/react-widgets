"use strict";

var _           = require('lodash');
var React       = require('react');
var I18nMixin   = require('../../mixins/I18n');
var Input       = require('../../forms/Input');
var ShareIcon   = require('../ShareIcon');
var format      = require('../../../lib/format');

var networks = [
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

  fetchValue: function(networkName, value) {
    return _.result(_.find(networks, function(network) {
      return network.name == networkName;
    }), value);
  },

  renderShareIcons: function() {
    return this.props.networks.map(function(name) {
      var url  = this.fetchValue(name, "url");
      var icon = this.fetchValue(name, "icon") || name;

      url = format(url, {
        "url": this.props.shareUrl,
        "title": this.props.shareTitle,
        "img": this.props.shareImage
      }, true);

      return (
        <ShareIcon
          key={ name }
          network={ name }
          icon={ icon }
          open={ this.openDialog.bind(null, url) } />
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

          <div className="ShareBox__networks">
            <label>Share via</label>
            <div className="ShareBox__icons">
              { this.renderShareIcons() }
            </div>
          </div>
      </div>
    );
  }
});
