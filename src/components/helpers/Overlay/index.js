/** @jsx React.DOM */
"use strict";

var React     = require('react');
var Icon      = require('../Icon');

var $ = {
  addClass:     require('../../../lib/addClass'),
  removeClass:  require('../../../lib/removeClass'),
};

module.exports = React.createClass({
  keyHandler: function(event) {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  },

  onClose: function(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  componentWillMount: function() {
    $.addClass(document.body, 'Overlay-open');
  },

  componentWillUnmount: function() {
    $.removeClass(document.body, 'Overlay-open');
  },

  render: function() {
    return (
      <div className='Overlay' onKeyDown={ this.keyHandler }>
        <a href="#" className="Overlay__close" onClick={ this.onClose }><Icon icon="close" /></a>
        { this.props.children || null }
      </div>
    );
  }
});
