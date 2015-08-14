'use strict';

var _ = require('lodash');
var React = require('react');
var DOMInfo = require('../../mixins/DOMInfo');
var I18n = require('../../mixins/I18n');
var Icon = require('../../helpers/Icon');
var Event = require('../Event');
var campaign = require('../../../api/campaigns');
var charity = require('../../../api/charities');

var blacklist = ['au-18856', 'au-18881', 'au-18882', 'au-18883', 'au-18884', 'au-18885', 'au-18886', 'au-18887', 'au-18888', 'au-18889', 'au-18890', 'au-18891', 'au-18892', 'au-18893', 'au-18894', 'au-18895', 'au-18896', 'au-18897', 'au-18898', 'au-18899', 'au-18900', 'au-18901', 'au-18902', 'au-18904', 'au-18905', 'au-18906', 'au-18907', 'au-18908', 'au-18909', 'au-18910', 'au-18911', 'au-18912', 'au-18913', 'au-18918', 'au-18919', 'au-18920', 'au-18921', 'au-6045', 'au-3042', 'au-18012', 'au-10631'];

var whitelist = [];

module.exports = React.createClass({
  displayName: 'UpcomingEvents',

  mixins: [I18n, DOMInfo],

  propTypes: {
    charityUid: React.PropTypes.string.isRequired,
    excludeEvents: React.PropTypes.string,
    featureEvents: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      excludeEvents: null,
      featureEvents: null,
      defaultI18n: {
        title: 'Upcoming Events'
      }
    };
  },

  getInitialState: function() {
    if (this.props.excludeEvents) {
      blacklist = blacklist.concat(this.props.excludeEvents.split(','));
    }

    if (this.props.featureEvents) {
      whitelist = whitelist.concat(this.props.featureEvents.split(','));
    }

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

  isBlacklisted: function(id) {
    return blacklist.indexOf(id) !== -1;
  },

  isWhitelisted: function(id) {
    return whitelist.indexOf(id) !== -1;
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

      if (whitelist.length > 0) {
        if (this.isWhitelisted(e.id)) {
          return <Event { ...props } />;
        }
      } else {
        return !this.isBlacklisted(e.id) && <Event { ...props } />;
      }
    }, this);
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
