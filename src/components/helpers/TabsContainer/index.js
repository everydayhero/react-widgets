/** @jsx React.DOM */
"use strict";

var _            = require('lodash');
var React        = require('react');
var Tab          = require('../Tab');
var TabContent   = require('../Tab');

module.exports = React.createClass({
  displayName: "TabsContainer",

  getInitialState: function () {
    return {
      current: 0
    }
  },

  switchTab: function(i) {
    this.setState({ current: i });
  },

  renderTabs: function() {
    return this.props.data.map(function(d, i) {
      return <Tab onClick={ this.switchTab } label={ d.tab } index={ i } active={ this.state.current === i } />
    }, this);
  },

  renderSomething: function() {
    console.log('hi');
  },

  render: function() {
    return (
      <div className="TabContainer">
        { this.renderSomething() }
      </div>
    )
  }
});
