/** @jsx React.DOM */
"use strict";

var React                 = require('react');
var PromoCharitiesTab     = require('../PromoCharitiesTab');
var PromoCharitiesDrawer  = require('../PromoCharitiesDrawer');
var PromoCharitiesResults = require('../PromoCharitiesResults');

module.exports = React.createClass({
  displayName: "PromoCharitiesTabs",

  getInitialState: function() {
    return { current: 0 };
  },

  switchTab: function(i) {
    this.setState({ current: i });
  },

  renderTabs: function() {
    return this.props.data.map(function(d, i) {
      return <PromoCharitiesTab onClick={ this.switchTab } label={ d.tabName } index={ i } active={ this.state.current === i } />
    }, this);
  },

  renderContent: function() {
    return this.props.data.map(function(d, i) {
      return (
        <div className="PromoCharitiesTabs__content">
          <div className="PromoCharitiesTabs__accordion">
            <PromoCharitiesDrawer
              onClick={ this.switchTab }
              label={ d.tabName }
              index={ i }
              active={ this.state.current === i } />
          </div>
          <PromoCharitiesResults
            content={ d.contents }
            index={ i }
            active={ this.state.current === i }
            onSelect={ this.props.onSelect }
            loaded={ this.props.loaded } />
        </div>
      );
    }, this);
  },

  render: function() {
    return (
      <div className="PromoCharitiesTabs">
        <div className="PromoCharitiesTabs__tab-row">
          { this.renderTabs() }
        </div>
        { this.renderContent() }
      </div>
    );
  }
});
