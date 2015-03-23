"use strict";

var React = require('react');
var Icon  = require('../../helpers/Icon');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
  displayName: "ShareIcon",

  handleClick: function() {
    this.props.open();
  },

  render: function() {
    return (
      <div className={ 'ShareBox__icon ShareBox__' + this.props.service } onClick={ this.handleClick }>
        <Icon icon={ this.props.service } />
      </div>
    );
  }
});
