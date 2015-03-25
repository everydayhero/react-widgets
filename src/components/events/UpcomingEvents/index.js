'use strict';

var _ = require('lodash');
var React = require('react');
var I18n = require('../../mixins/I18n');
var DOMInfo = require('../../mixins/DOMInfo');
var Icon = require('../../helpers/Icon');
var Event = require('../Event');
var campaign = require('../../../api/campaigns');
var charity = require('../../../api/charities');
var addEventListener = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

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
        emptyLabel: 'No upcoming events available.'
      }
    };
  },

  getInitialState: function() {
    return {
      events: [],
      isLoading: true,
      content: this.renderLoading()
    };
  },

  loadEvents: function() {
    campaign.findByCharity(this.props.charityUid, 1, 20, function(result) {
      this.setEvents(result ? result.campaigns : []);
    }.bind(this));
  },

  setEvents: function (events) {
    this.setState({ events: events, isLoading: false }, this.setContent);
  },

  componentWillMount: function() {
    this.loadEvents();
  },

  componentDidMount: function() {
    addEventListener(window, 'resize', this.resize);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'resize', this.resize);
  },

  resize: _.debounce(function() {
    this.setContent();
  }, 100, { trailing: true }),

  setContent: function() {
    this.setState({ content: this.renderContent() });
  },

  renderContent: function() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    if (_.isEmpty(this.state.events)) {
      return this.renderEmpty();
    }


    return this.renderEvents();
  },

  renderEvents: function() {
    var count = this.getChildCountFromWidth(240);
    var width = this.getChildWidth(count);
    return _.map(_.take(this.state.events, count), function(e) {
      var backgroundColor = e.background_color ? e.background_color : '#525252';
      var date = new Date(e.display_finish_at);
      return <Event key={ e.id }
                    name={ e.name }
                    date={ date }
                    campaignUrl={ e.url}
                    getStartedUrl={ e.get_started_url }
                    backgroundColor={ backgroundColor }
                    backgroundImageUrl={ e.background_image_url }
                    supporterCount={ e.page_count }
                    width={ width } />;
    });
  },

  renderLoading: function() {
    return <Icon className='UpcomingEvents__loading' icon='circle-o-notch' />;
  },

  renderEmpty: function() {
    return <p className='UpcomingEvents__empty-label'>{ this.t('emptyLabel') }</p>;
  },

  render: function() {
    return (
      <div className={ 'UpcomingEvents ' + this.state.device }>
        { this.state.content }
      </div>
    );
  }
});
