"use strict";

var React = require('react');
var Icon  = require('../../helpers/Icon');

module.exports = React.createClass({
  displayName: "PromoCharitiesDrawer",

  handleClick: function() {
    this.props.onClick(this.props.index);
  },

  renderIcon: function() {
    if (this.props.active) {
      return <Icon className="PromoCharitiesDrawer__icon" icon="caret-down" />;
    }

    return <Icon className="PromoCharitiesDrawer__icon" icon="caret-right" />;
  },

  render: function() {
    var active = this.props.active ? " active" : '';

    return (
      <div onClick={ this.handleClick } className={ "PromoCharitiesDrawer" + active }>
        <span className="PromoCharitiesDrawer__label" title={ this.props.label }>{ this.props.label }</span>
        { this.renderIcon() }
      </div>
    );
  }
});
