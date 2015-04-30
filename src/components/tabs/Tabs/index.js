"use strict";

var _                   = require('lodash');
var React               = require('react');
var Tab                 = require('../Tab');
var TabDrawer           = require('../TabDrawer');
var TabPanel            = require('../TabPanel');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

module.exports = React.createClass({
  displayName: "Tabs",
  propTypes: {
    children: React.PropTypes.array
  },

  getDefaultProps: function() {
    return { children: [] };
  },

  getInitialState: function() {
    return {
      current: 0,
      tabListWidth: 0,
      stacked: false
    };
  },

  componentDidMount: function() {
    this.setState({
      tabListWidth: this.refs.tabList.getDOMNode().offsetWidth || 0
    });

    addEventListener('resize', this.checkWidth);
    this.checkWidth();
  },

  componentWillUnmount: function() {
    removeEventListener('resize', this.checkWidth);
  },

  checkWidth: _.debounce(function() {
    var componentWidth = this.getDOMNode().offsetWidth || 0;
    var tabListWidth   = this.state.tabListWidth;

    this.setState({
      stacked: tabListWidth > componentWidth
    });
  }, 100, { trailing: true }),

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
    if (!this.state.stacked) {
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
    }
  },

  renderTabDrawers: function(d, i) {
    if (this.state.stacked) {
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
    }
  },

  renderContent: function() {
    return this.props.children.map(function(d, i) {
      return (
        <div className="Tabs__content" key={ 'content-' + i }>
          { this.renderTabDrawers(d, i) }
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
      <div className="Tabs">
        <div className="Tabs__tab-list" ref="tabList" role="tablist">
          { this.renderTabs() }
        </div>
        { this.renderContent() }
      </div>
    );
  }
});
