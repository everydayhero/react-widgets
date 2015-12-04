'use strict';

var _ = require('lodash');
var React = require('react');
var DOMInfo = require('../../mixins/DOMInfo');
var I18n = require('../../mixins/I18n');
var Icon = require('../../helpers/Icon');
var Event = require('../Event');
var Button = require('../../callstoaction/CallToActionButton');
var campaign = require('../../../api/campaigns');

var blacklist = [
  'au-18856', 'au-18881', 'au-18882', 'au-18883', 'au-18884', 'au-18885',
  'au-18886', 'au-18887', 'au-18888', 'au-18889', 'au-18890', 'au-18891',
  'au-18892', 'au-18893', 'au-18894', 'au-18895', 'au-18896', 'au-18897',
  'au-18898', 'au-18899', 'au-18900', 'au-18901', 'au-18902', 'au-18904',
  'au-18905', 'au-18906', 'au-18907', 'au-18908', 'au-18909', 'au-18910',
  'au-18911', 'au-18912', 'au-18913', 'au-18918', 'au-18919', 'au-18920',
  'au-18921', 'au-6045', 'au-3042', 'au-18012', 'au-10631', 'nz-753',
  'au-19589', 'au-19651'
];

module.exports = React.createClass({
  displayName: 'UpcomingEvents',

  mixins: [I18n, DOMInfo],

  propTypes: {
    charityUid: React.PropTypes.string.isRequired,
    excludeEvents: React.PropTypes.array,
    events: React.PropTypes.array,
    i18n: React.PropTypes.object,
    showCount: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      excludeEvents: [],
      events: [],
      showCount: 10,
      defaultI18n: {
        title: 'Upcoming Events',
        show_all: 'Show all events',
        show_less: 'Show less events'
      }
    };
  },

  getInitialState: function() {
    return {
      events: [],
      showAll: false,
      cancelLoad: function() {},
      blacklist: this.props.excludeEvents.concat(blacklist)
    };
  },

  componentDidMount: function() {
    this.loadEvents();
  },

  componentWillUnmount: function() {
    this.state.cancelLoad();
  },

  setShowAll: function() {
    this.setState({ showAll: !this.state.showAll });
  },

  blacklisted: function(id) {
    return this.state.blacklist.indexOf(id) !== -1;
  },

  whitelisted: function(id) {
    return this.props.events.indexOf(id) !== -1;
  },

  filterEvents: function(events) {
    return _.filter(events, function(e) {
      return this.whitelisted(e.uid) || !this.blacklisted(e.uid);
    }, this);
  },

  sortEvents: function(events) {
    return _.sortByAll(events, 'charity_count', function(e) {
      return new Date(e.display_start_at);
    });
  },

  loadEvents: function() {
    var query = {
      searchTerm: '',
      charityUids: this.props.charityUid,
      page: 1,
      pageSize: 100,
      excludeBau: true,
      includePagesActive: true,
    };
    var cancelLoad = campaign.search(query, this.onEventLoad);
    this.setState({ cancelLoad: cancelLoad });
  },

  onEventLoad: function(result) {
    if (!result.campaigns) { return; }
    this.setState({ events: this.sortEvents(this.filterEvents(result.campaigns)) });
  },

  renderEvents: function() {
    var count = this.getChildCountFromWidth(300);
    var width = this.getChildWidth(count);

    var events = this.state.showAll ? this.state.events : this.state.events.slice(0, this.props.showCount);
    return _.map(events, function(e) {
      var props = {
        key: e.id,
        name: e.name,
        date: new Date(e.display_start_at),
        campaignUrl: e.url,
        donateUrl: this.donateUrl(e.donate_url),
        getStartedUrl: e.get_started_url,
        backgroundImageUrl: e.widget_background_image_url,
        backgroundBlurUrl: e.widget_blurred_background_image_url,
        centsRaised: e.funds_raised.cents,
        currencySymbol: e.funds_raised.currency.symbol,
        supporterCount: e.page_count,
        width: width
      };

      return <Event { ...props } />;
    }, this);
  },

  donateUrl: function(url) {
    if (url) {
      return url + '?charity_id=' + this.props.charityUid
    }
  },

  renderButton: function() {
    return <Button
      kind="primary"
      label={ this.t(this.state.showAll ? 'show_less' : 'show_all') }
      icon={ this.state.showAll ? "chevron-up" : "chevron-down" }
      className="UpcomingEvents__showAllButton"
      onClick={ this.setShowAll }/>
  },

  render: function() {
    var eventCount = this.state.events.length;
    return (
      <div className={ 'UpcomingEvents ' + this.state.device }>
        { !!eventCount && <h2 className="UpcomingEvents__title">{ this.t('title') }</h2> }
        <div>{ !!eventCount && this.renderEvents() }</div>
        { (!!eventCount && eventCount > this.props.showCount) && this.renderButton() }
      </div>
    );
  }
});
