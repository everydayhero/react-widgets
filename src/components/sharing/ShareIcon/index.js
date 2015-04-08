"use strict";

var React = require('react');
var Icon  = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: "ShareIcon",
  propTypes: {
    open: React.PropTypes.func.isRequired,
    name: React.PropTypes.oneOf(['facebook', 'twitter', 'googleplus', 'pinterest']),
    icon: React.PropTypes.string
  },

  handleClick: function() {
    this.props.open();
  },

  render: function() {
    return (
      <div className={ 'ShareIcon ShareIcon__' + this.props.name } onClick={ this.handleClick }>
        <Icon icon={ this.props.icon } />
      </div>
    );
  }
});
