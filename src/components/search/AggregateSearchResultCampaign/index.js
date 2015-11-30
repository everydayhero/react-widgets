'use strict';

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');
var I18n          = require('../../mixins/I18n');
var AggregateSearchResult = require('../AggregateSearchResult');

module.exports = React.createClass({
  displayName: 'AggregateSearchResultCampaign',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        numSupporters: {
          one: '1 Supporter',
          other: '{count:0,0} Supporters'
        },
        numCharities: {
          one: '1 Charity',
          other: '{count:0,0} Charities'
        },
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
  },

  renderDate: function () {
    var campaign = this.props.result;
    if (!campaign.display_start_at) {
      return (
        <div className="AggregateSearchResultCampaign__date">
          <Icon icon="heart-o" className="AggregateSearchResultCampaign__icon" />
        </div>
      );
    }

    var date = new Date(campaign.display_start_at);
    return (
      <ul className="AggregateSearchResultCampaign__date">
        <li>{ date.getDate() }</li>
        <li>{ this.t('months')[date.getMonth()] }</li>
        <li>{ date.getFullYear() }</li>
      </ul>
    );
  },

  renderNumSupporters: function () {
    var campaign = this.props.result;
    return campaign.page_count >= 20 && (
      <span className="AggregateSearchResultCampaign__supporters">
        { this.t('numSupporters', { count: campaign.page_count }) }
      </span>
    );
  },

  renderNumCharities: function () {
    var campaign = this.props.result;
    return campaign.charity_count >= 0 && (
      <span className="AggregateSearchResultCampaign__charities">
        { this.t('numCharities', { count: campaign.charity_count }) }
      </span>
    );
  },

  render: function() {
    var campaign = this.props.result;
    var url = campaign.url || campaign.get_started_url;

    return (
      <AggregateSearchResult onSelect={ this.props.onSelect } result={ campaign }>
        { this.renderDate() }
        <div className="AggregateSearchResultCampaign__content">
          <div className="AggregateSearchResultCampaign__header">{ campaign.name }</div>
          <div className="AggregateSearchResultCampaign__subheader">
            { this.renderNumSupporters() }
            { this.renderNumCharities() }
          </div>
          <p className="AggregateSearchResultCampaign__description">{ campaign.description }</p>
        </div>
      </AggregateSearchResult>
    );
  }
});
