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
    var dialogX = window.screen.availWidth/2 - 650/2;
    var dialogY = window.screen.availHeight/2 - 310/2;

    var wWidth = window.innerWidth;


    var config = {
      toolbar: 0,
      status: 0,
      width: 650,
      height: 310,
      top: dialogY,
      left: dialogX
    };

    console.log(wWidth);

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
