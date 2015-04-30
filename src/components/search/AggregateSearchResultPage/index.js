"use strict";

var _                           = require('lodash');
var React                       = require('react');
var Icon                        = require('../../helpers/Icon');
var I18n                        = require('../../mixins/I18n');
var pagesAPI                    = require('../../../api/pages');
var AggregateSearchResult       = require('../AggregateSearchResult');

module.exports = React.createClass({
  displayName: 'AggregateSearchResultPage',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        raised_amount: 'has raised **{currency}{amount:0}** of **{currency}{target:0}** goal',
        raised_for_charity: 'for *{charity}*',
        raised_for_charity_through_campaign: 'for *{charity}* through *{campaign}*'
      }
    };
  },

  render: function() {
    var props = this.props;
    var page = props.result;
    var progress = page.amount && page.target_cents > 0 &&
      Math.min(Math.floor(page.amount.cents / page.target_cents * 100), 100) || 0;
    var raised_amount = page.amount && page.target_cents >= 0 &&
      this.tm('raised_amount', {
        currency: page.amount.currency.symbol,
        amount: page.amount.cents / 100,
        target: page.target_cents / 100
      });
    var raised_for =
      this.tm(pagesAPI.isGivePage(page) ? 'raised_for_charity' : 'raised_for_charity_through_campaign', {
        charity: page.charity.name,
        campaign: page.campaign.name
      });

    return (
      <AggregateSearchResult url={ page.url }>
        <div className='AggregateSearchResultPage__avatar'>
          <img src={ page.image.medium_image_url } />
        </div>
        <div className='AggregateSearchResultPage__content'>
          <div className='AggregateSearchResultPage__header'>
            <span className="AggregateSearchResultPage__heading">{ page.supporter.name }</span>
            <span className="AggregateSearchResultPage__subheading">{ page.supporter.name }</span>
          </div>
          <div className='AggregateSearchResultPage__progress'>
            <div className='AggregateSearchResultPage__progress__bar' style={{ width: progress + '%' }} />
          </div>
          <div className='AggregateSearchResultPage__amount'>{ raised_amount }</div>
          <div className='AggregateSearchResultPage__for'>{ raised_for }</div>
        </div>
      </AggregateSearchResult>
    );
  }
});
