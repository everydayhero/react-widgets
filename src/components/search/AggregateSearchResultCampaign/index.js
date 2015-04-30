"use strict";

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
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        numSupporters: '{count:0,0} Supporters',
        numCharities: '{count:0,0} Charities',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
  },

  render: function() {
    var t = this.t;
    var props = this.props;
    var campaign = props.result;

    var avatar;
    if (campaign.display_start_at) {
      var date = new Date(campaign.display_start_at);
      avatar = (
        <ul className="AggregateSearchResultCampaign__avatar">
          <li>{ date.getDate() }</li>
          <li>{ t('months')[date.getMonth()] }</li>
          <li>{ date.getFullYear() }</li>
        </ul>
      );
    } else {
      avatar =
        <div className="AggregateSearchResultCampaign__avatar" />;
    }

    var name =
      <span className="AggregateSearchResultCampaign__name">{ campaign.name }</span>;

    var supporters = campaign.page_count >= 20 &&
      <span className='AggregateSearchResultCampaign__supporters'>
        { t('numSupporters', { count: campaign.page_count }) }
      </span>;

    var charities = campaign.charity_count >= 0 &&
      <span className='AggregateSearchResultCampaign__charities'>
        { t('numCharities', { count: campaign.charity_count }) }
      </span>;

    return (
      <AggregateSearchResult url={ campaign.get_started_url }>
        { avatar }
        <div className='AggregateSearchResultCampaign__content'>
          <div className='AggregateSearchResultCampaign__header'>
            { name }
          </div>
          <div className='AggregateSearchResultCampaign__subheader'>
            { supporters }
            { charities }
          </div>
          <p className='AggregateSearchResultCampaign__description'>{ campaign.description }</p>
        </div>
      </AggregateSearchResult>
    );
  }
});
