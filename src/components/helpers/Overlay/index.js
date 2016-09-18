import React from 'react';
import Icon from '../Icon';
import addClass from '../../../lib/addClass';
import removeClass from '../../../lib/removeClass';

const $ = { addClass, removeClass };

export default React.createClass({
  displayName: 'Overlay',

  propTypes: {
    className: React.PropTypes.string,
    onClose: React.PropTypes.func,
    showCloseButton: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      className: '',
      showCloseButton: true
    };
  },

  getInitialState: function() {
    return {
      scrollPosition: 0
    };
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
    this.setState({ scrollPosition: document.documentElement.scrollTop || document.body.scrollTop });
    $.addClass(document.body, 'Overlay-open');
  },

  componentWillUnmount: function() {
    $.removeClass(document.body, 'Overlay-open');
    document.documentElement.scrollTop = document.body.scrollTop = this.state.scrollPosition;
  },

  render: function() {
    var classes = ['Overlay', this.props.className].join(' ');
    var closeButton = this.props.onClose && this.props.showCloseButton &&
      <a href="#" className="Overlay__close" onClick={ this.onClose }><Icon icon="times" /></a>;

    return (
      <div className={ classes } onKeyDown={ this.keyHandler }>
        { closeButton }
        { this.props.children }
      </div>
    );
  }
});
