'use strict';

var _ = require('lodash');
var React = require('react');
var I18n = require('../../mixins/I18n');
var Icon = require('../../helpers/Icon');
var Event = require('../Event');
var campaign = require('../../../api/campaigns');
var charity = require('../../../api/charities');

module.exports = React.createClass({
  displayName: 'UpcomingEvents',
  mixins: [I18n],
  propTypes: {
    charityUid: React.PropTypes.string.isRequired,
    charitySlug: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object
  },

  // () -> Object
  getDefaultProps: function() {
    return {
      defaultI18n: {
        emptyLabel: 'No events to display.'
      }
    };
  },

  // () -> Object
  getInitialState: function() {
    return {
      content: this.renderIcon()
    };
  },

  // () -> ()
  componentWillMount: function() {
    var self = this;

    campaign.findByCharity(this.props.charityUid, 1, 6, function(result) {
      self.setState({
        content: self.renderEvents(result.campaigns)
      });
    });
  },

  // [Event] -> XJS
  renderEvents: function(events) {
    var self = this;

    if(!_.isEmpty(events)) {
      return _.map(events, function(e) {
        var fundraiseUrl = charity.fundraiseUrl({country_code: e.country_code, slug: self.props.charitySlug}, e.slug);
        var backgroundColor = e.background_color ? e.background_color : 'transparent';
        var date = new Date(e.display_finish_at);
        return <Event key={ e.id }
                      name={ e.name }
                      date={ date }
                      getStartedUrl={ fundraiseUrl }
                      backgroundColor={ backgroundColor }
                      backgroundImageUrl={ e.background_image_url }
                      supporterCount={ e.page_count } />;
      });
    } else {
      return (
        <p className='UpcomingEvents__empty-label'>{ this.t('emptyLabel') }</p>
      );
    }
  },

  // () -> XJS
  renderIcon: function() {
    return <Icon className='UpcomingEvents__loading' icon='refresh' />;
  },

  // () -> XJS
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
