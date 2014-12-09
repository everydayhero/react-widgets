"use strict";

var React = require('react/addons');
var FlagIcon = require('../../helpers/FlagIcon');
var cx = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "CountrySelectItem",

  propTypes: {
    focused: React.PropTypes.bool,
    country: React.PropTypes.shape({ name: React.PropTypes.string, iso: React.PropTypes.string }),
    onMouseEnter: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      focused: false,
      country: { name: 'Country Missing', iso: 'XX' }
    };
  },

  handleClick: function() {
    this.props.onClick(this.props.country);
  },

  handleMouse: function() {
    this.props.onMouseEnter(this.props.index);
  },

  render: function() {
    var classes = cx({
      'CountrySelectItem': true,
      'CountrySelectItem--focused': this.props.focused
    });
    return (
      <div className={ classes } onMouseEnter={ this.handleMouse } onClick={ this.handleClick }>
        <FlagIcon className="CountrySelectItem__flag" country={ this.props.country.iso } />
        { this.props.country.name }
      </div>
    );
  }
});
