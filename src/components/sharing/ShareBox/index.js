"use strict";

var React       = require('react');
var I18nMixin   = require('../../mixins/I18n');
var Input       = require('../../forms/Input');
var ShareDialog = require('share-dialog');
var ShareIcon   = require('../ShareIcon');


var url = "http://example.com";

var facebook   = ShareDialog.facebook(url);
var twitter    = ShareDialog.twitter(url, "This is my tweet");
var pinterest  = ShareDialog.pinterest(url, "This is my tweet");
var googleplus = ShareDialog.gplus(url);

module.exports = React.createClass({
  displayName: "ShareBox",

  handleClick: function(serviceName) {
    if (serviceName == "twitter") {
      twitter.open();
    }

    if (serviceName == "googleplus") {
      googleplus.open();
    }

    if (serviceName == "facebook") {
      facebook.open();
    }
  },

  renderShareIcons: function() {
    return this.props.services.map(function(name) {
      return <ShareIcon key={ name } service={ name } open={ this.handleClick.bind(null, name) } />;
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
