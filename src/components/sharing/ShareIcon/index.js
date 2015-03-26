"use strict";

var React = require('react');
var Icon  = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: "ShareIcon",

  handleClick: function() {
    this.props.open();
  },

  render: function() {
    return (
      <div className={ 'ShareIcon ShareIcon__' + this.props.service } onClick={ this.handleClick }>
        <Icon icon={ this.props.icon } />
      </div>
    );
  }
});
