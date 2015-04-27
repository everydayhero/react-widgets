"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "TabPanel",
  propTypes: {
    content: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    panelId: React.PropTypes.string.isRequired,
    labelledBy: React.PropTypes.string.isRequired
  },

  render: function() {
    var active = this.props.active ? " TabPanel--active" : '';

    return (
      <div
        className={ "TabPanel" + active }
        dangerouslySetInnerHTML={{ __html: this.props.content }}
        role="tabpanel"
        aria-labelledby={ this.props.labelledBy } />
    );
  }
});
