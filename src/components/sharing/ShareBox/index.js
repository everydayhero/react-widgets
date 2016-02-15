'use strict';

var React     = require('react');
var Input     = require('../../forms/Input');
var ShareIcon = require('../ShareIcon');

module.exports = React.createClass({
  displayName: 'ShareBox',

  renderShareIcons: function() {
    return this.props.services.map(function(service) {
      return (
        <ShareIcon
          key={ service.name }
          name={ service.name }
          icon={ service.icon || service.name }
          url={ service.url } />
      );
    }, this);
  },

  renderServiceButtons: function() {
    if (this.props.services.length !== 0) {
      return (
        <div>
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
  },

  render: function() {
    var shareLinkLabel = this.props.shareLinkLabel;

    return (
      <div className="ShareBox">
        <Input
          readOnly
          autoSelect
          type="url"
          icon="link"
          value={ this.props.shareUrl }
          i18n={{ label: shareLinkLabel }}
          spacing="compact" />

        { this.renderServiceButtons() }
      </div>
    );
  }
});
