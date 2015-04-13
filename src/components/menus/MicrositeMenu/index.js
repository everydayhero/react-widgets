"use strict";

var React           = require('react/addons');
var _               = require('lodash');
var I18nMixin       = require('../../mixins/I18n');
var Emitter         = require('../../../lib/EventEmitter');

module.exports = React.createClass({
  displayName: "MicrositeMenu",
  mixins: [I18nMixin],

  propTypes: {
    eventIds: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      eventIds: [],
      defaultI18n: {
        howItWorks: 'how it works',
        about: 'about',
        leaderboard: 'leaderboard'
      }
    };
  },

  getInitialState: function() {
    return {
      dynamicItems: []
    };
  },

  onHasContent: function(obj) {
    var dynamicItems = this.state.dynamicItems;
    dynamicItems.push(obj);

    this.setState({
      dynamicItems: dynamicItems
    });
  },

  componentWillMount: function() {
    var eventIds = this.props.eventIds;
    var callback = this.onHasContent;

    _.each(eventIds, function(e){
      Emitter.on(e, callback);
    });
  },

  shouldRenderDynamicItems: function() {
    var dynamicItems  = this.state.dynamicItems;
    var shouldDisplay = false;

    if (dynamicItems.length > 0) {
      shouldDisplay = _.any(dynamicItems, function(item) {
        return item.hasContent;
      });
    }
    return shouldDisplay;
  },

  renderStaticItems: function() {
    return (
      <div className="MicrositeMenu__static">
        <a className="MicrositeMenu__link" href="#how-it-works">{ this.t('howItWorks') }</a>
        <a className="MicrositeMenu__link" href="#about">{ this.t('about') }</a>
      </div>
    );
  },

  renderDynamicItems: function() {
    var dynamicItems  = this.state.dynamicItems;
    var shouldDisplay = this.shouldRenderDynamicItems();

    if (shouldDisplay) {
      return (
        <div className="MicrositeMenu__dynamic">
          <a className="MicrositeMenu__link" href="#Leaderboard">{ this.t('leaderboard') }</a>
        </div>
      );
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div className='MicrositeMenu'>
        { this.renderStaticItems() }
        { this.renderDynamicItems() }
      </div>
    );
  }
});
