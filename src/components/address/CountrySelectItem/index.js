"use strict";

var React = require('react/addons');
var cx = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "CountrySelectItem",

  propTypes: {
    flag: React.PropTypes.string,
    focused: React.PropTypes.bool,
    country: React.PropTypes.shape({ name: React.PropTypes.string, iso: React.PropTypes.string }),
    onMouseEnter: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      flag: '',
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
    var flag = { backgroundImage: "url('" + this.props.flag + this.props.country.iso.toLowerCase() + ".png')" };
    var classes = cx({
      'CountrySelectItem': true,
      'CountrySelectItem--Focused': this.props.focused
    });
    return (
      <div className={ classes } onMouseEnter={ this.handleMouse } onClick={ this.handleClick }>
        <div className="CountrySelectItem__Flag" style={ flag }></div>
        { this.props.country.name }
      </div>
    );
  }
});
