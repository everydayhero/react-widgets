"use strict";

var _           = require('lodash');
var React       = require('react');
var I18nMixin   = require('../../mixins/I18n');
var Input       = require('../../forms/Input');
var ShareIcon   = require('../ShareIcon');
var format      = require('../../../lib/format');

var shareServices = [
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
    url: "https://plus.google.com/share?url={url}"
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
      width: 650,
      height: 310
    };

    var windowTop = window.screenTop ? window.screenTop : window.screenY;
    var windowLeft = window.screenLeft ? window.screenLeft : window.screenX;

    config.top = windowTop + (window.innerHeight / 2) - (config.height / 2);
    config.left = windowLeft + (window.innerWidth / 2) - (config.width / 2);

    config = this.toString(config);

    window.open(url, 'sharer', config);
  },

  getUrl: function(serviceName) {
    var serviceUrl = _.result(_.find(shareServices, function(service) {
      return service.name == serviceName;
    }), "url");

    return format(serviceUrl, {
      "url": this.props.shareUrl,
      "title": this.props.shareTitle,
      "img": this.props.image
    }, true);
  },

  renderShareIcons: function() {
    return this.props.services.map(function(name) {

      var url = this.getUrl(name);

      return <ShareIcon key={ name } service={ name } open={ this.openDialog.bind(null, url) } />;
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
          icon="clipboard"
          value="http://everydayhero.com/us"
          i18n={{ label: shareLinkLabel }}
          spacing="compact" />

          <div className="ShareBox__divider">
            <span>Or</span>
          </div>

          <div className="ShareBox__services">
            <label>Share via</label>
            { this.renderShareIcons() }
          </div>
      </div>
    );
  }
});
