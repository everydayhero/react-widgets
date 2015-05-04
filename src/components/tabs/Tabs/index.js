"use strict";

var _            = require('lodash');
var React        = require('react');
var Tab          = require('../Tab');
var TabDrawer    = require('../TabDrawer');
var TabPanel     = require('../TabPanel');
var DOMInfoMixin = require('../../mixins/DOMInfo');

module.exports = React.createClass({
  displayName: "Tabs",
  mixins: [DOMInfoMixin],
  propTypes: {
    children: React.PropTypes.array
  },

  getDefaultProps: function() {
    return { children: [] };
  },

  getInitialState: function() {
    return {
      current: 0,
      stacked: false
    };
  },

  switchTab: function(i) {
    this.setState({ current: i });
  },

  handleKeyDown: function(e, i) {
    var key       = e.keyCode || e.which;
    var totalTabs = this.props.children.length - 1;
    var current   = this.state.current;

    if ((key === 39 || key === 40) && current < totalTabs) {
      e.preventDefault();
      this.switchTab(current + 1);
    }

    if ((key === 37 || key === 38) && current > 0) {
      e.preventDefault();
      this.switchTab(current - 1);
    }

    if (key === 13) {
      e.preventDefault();
      this.switchTab(i);
    }
  },

  renderTabs: function() {
    return this.props.children.map(function(d, i) {
      return (
        <Tab
          onClick={ this.switchTab }
          onKeyDown={ this.handleKeyDown }
          label={ d.label || d.props.tabLabel }
          index={ i }
          active={ this.state.current === i }
          tabId={ "tab-" + i }
          controls={ "panel-" + i }
          key={ 'tab-' + i } />
      );
    }, this);
  },

  renderTabDrawers: function(d, i) {
    return (
      <TabDrawer
        onClick={ this.switchTab }
        onKeyDown={ this.handleKeyDown }
        label={ d.label || d.props.tabLabel }
        index={ i }
        active={ this.state.current === i }
        tabId={ "tab-" + i }
        controls={ "panel-" + i }
        key={ 'drawer-' + i } />
    );
  },

  renderContent: function() {
    return this.props.children.map(function(d, i) {
      return (
        <div className="Tabs__content" key={ 'content-' + i }>
          <div className="Tabs__drawer">
            { this.renderTabDrawers(d, i) }
          </div>
          <TabPanel
            content={ d.content || d }
            index={ i }
            panelId={ "panel-" + i }
            labelledBy={ "tab-" + i }
            active={ this.state.current === i } />
        </div>
      );
    }, this);
  },

  render: function() {
    return (
      <div className={ "Tabs" + " Tabs--" + this.state.size }>
        <div className="Tabs__tab-list" ref="tabList" role="tablist">
          { this.renderTabs() }
        </div>
        { this.renderContent() }
      </div>
    );
  }
});
