"use strict";

var _      = require('lodash');
var React  = require('react');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon:       React.PropTypes.string.isRequired,
    className:  React.PropTypes.string,
    fixedWidth: React.PropTypes.bool,
    spin:       React.PropTypes.bool,
    type:       React.PropTypes.string,
  },

  render: function() {
    var classes = _.compact([
      'Icon',
      this.props.type && ('Icon--' + this.props.type),
      'fa',
      this.props.fixedWidth && 'fa-fw',
      this.props.spin && 'fa-spin',
      'fa-' + (this.props.icon || 'rocket')
    ]).join(' ');

    var wrapperClasses = _.compact(['IconWrapper', this.props.className]).join(' ');
    return (
      <span className={ wrapperClasses }><i className={classes} /></span>
    );
  }
});
