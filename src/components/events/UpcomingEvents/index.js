'use strict';

var _ = require('lodash');
var React = require('react');
var DOMInfo = require('../../mixins/DOMInfo');
var I18n = require('../../mixins/I18n');
var Icon = require('../../helpers/Icon');
var Event = require('../Event');
var campaign = require('../../../api/campaigns');
var charity = require('../../../api/charities');

module.exports = React.createClass({
  displayName: 'UpcomingEvents',

  mixins: [I18n, DOMInfo],

  propTypes: {
    charityUid: React.PropTypes.string.isRequired,
    charitySlug: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        title: 'Upcoming Events'
      }
    };
  },

  getInitialState: function() {
    return {
      events: [],
      cancelLoad: function() {}
    };
  },

  loadEvents: function() {
    var cancelLoad = campaign.findByCharity(this.props.charityUid, 1, null, this.onLoaded, {
      status: 'active',
      sortBy: 'start_at',
      excludeBau: true,
      excludePages: true,
      excludeCharities: true
    });
    this.setState({ cancelLoad: cancelLoad });
  },

  onLoaded: function(result) {
    this.setEvents(result ? result.campaigns : []);
  },

  setEvents: function (events) {
    var sortedEvents = _.sortBy(events, function(e) { return new Date(e.display_start_at); });
    this.setState({ events: sortedEvents });
  },

  componentDidMount: function() {
    this.loadEvents();
  },

  componentWillUnmount: function() {
    this.state.cancelLoad();
  },

  renderEvents: function() {
    var count = this.getChildCountFromWidth(200);
    var width = this.getChildWidth(count);
    return _.map(this.state.events, function(e) {
      var props = {
        key: e.id,
        name: e.name,
        date: new Date(e.display_start_at),
        campaignUrl: e.url,
        donateUrl: e.donate_url,
        getStartedUrl: e.get_started_url,
        backgroundImageUrl: e.widget_background_image_url,
        backgroundBlurUrl: e.widget_blurred_background_image_url,
        supporterCount: e.page_count,
        width: width
      };
      return <Event { ...props } />;
    });
  },

  render: function() {
    var show = !_.isEmpty(this.state.events);

    return (
      <div className={ 'UpcomingEvents ' + this.state.device }>
        { show && <h2 className="UpcomingEvents__title">{ this.t('title') }</h2> }
        { show && this.renderEvents() }
      </div>
    );
  }
});
