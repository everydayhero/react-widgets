"use strict";

var React     = require('react');
var Icon      = require('../Icon');

var $ = {
  addClass:     require('../../../lib/addClass'),
  removeClass:  require('../../../lib/removeClass'),
};

module.exports = React.createClass({
  displayName: 'Overlay',

  propTypes: {
    onClose: React.PropTypes.func
  },

  keyHandler: function(event) {
    if (event.key === 'Escape') {
      this.onClose(event);
    }
  },

  onClose: function(event) {
    event.preventDefault();
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
    var closeButton = this.props.onClose &&
      <a href="#" className="Overlay__close" onClick={ this.onClose }><Icon icon="times" /></a>;

    return (
      <div className='Overlay' onKeyDown={ this.keyHandler }>
        { closeButton }
        { this.props.children }
      </div>
    );
  }
});
