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
        emptyLabel: 'No events to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      events: [],
      content: this.renderIcon()
    };
  },

  componentWillMount: function() {
    var component = this;
    campaign.findByCharity(this.props.charityUid, 1, 20, function(result) {
      component.setState({
        events: result.campaigns,
        content: component.renderEvents(result.campaigns)
      });
    });
  },

  componentDidMount: function() {
    addEventListener(window, 'resize', this.resize);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'resize', this.resize);
  },

  resize: function() {
    this.setState({
      content: this.renderEvents(this.state.events)
    });
  },

  renderEvents: function(events) {
    if(!_.isEmpty(events)) {
      var component = this;
      var count = this.getChildCountFromWidth(240);
      var width = this.getChildWidth(count);
      return _.map(_.take(events, count), function(e) {
        var fundraiseUrl = charity.fundraiseUrl({country_code: e.country_code, slug: component.props.charitySlug}, e.slug);
        var backgroundColor = e.background_color ? e.background_color : 'transparent';
        var date = new Date(e.display_finish_at);
        return <Event key={ e.id }
                      name={ e.name }
                      date={ date }
                      getStartedUrl={ fundraiseUrl }
                      backgroundColor={ backgroundColor }
                      backgroundImageUrl={ e.background_image_url }
                      supporterCount={ e.page_count }
                      width={ width } />;
      });
    } else {
      return (
        <p className='UpcomingEvents__empty-label'>{ this.t('emptyLabel') }</p>
      );
    }
  },

  renderIcon: function() {
    return <Icon className='UpcomingEvents__loading' icon='refresh' />;
  },

  render: function() {
    return (
      <div className='UpcomingEvents'>
        <div className='UpcomingEvents__content'>
          { this.state.content }
        </div>
      </div>
    );
  }
});
