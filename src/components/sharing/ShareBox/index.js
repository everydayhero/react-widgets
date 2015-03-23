"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var Icon      = require('../../helpers/Icon');
var Input     = require('../../forms/Input');

module.exports = React.createClass({
  displayName: "ShareBox",

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
            <Icon className="ShareBox__icon ShareBox__email" icon="envelope" />
            <Icon className="ShareBox__icon ShareBox__facebook" icon="facebook" />
            <Icon className="ShareBox__icon ShareBox__twitter" icon="twitter" />
            <Icon className="ShareBox__icon ShareBox__google-plus" icon="google-plus" />
            <Icon className="ShareBox__icon ShareBox__tumblr" icon="tumblr" />
            <Icon className="ShareBox__icon ShareBox__pinterest" icon="pinterest" />
            <Icon className="ShareBox__icon ShareBox__reddit" icon="reddit" />
            <Icon className="ShareBox__icon ShareBox__linkedin" icon="linkedin" />
          </div>

      </div>
    );
  }
});
