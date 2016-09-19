import React from 'react';
import I18n from '../../mixins/I18n';
import pagesAPI from '../../../api/pages';
import AggregateSearchResult from '../AggregateSearchResult';

export default React.createClass({
  displayName: 'AggregateSearchResultPage',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        raised_amount: 'has raised **{currency}{amount:0}** of **{currency}{target:0}** goal',
        raised_for_charity: 'for **{charity}**',
        raised_for_charity_through_campaign: 'for **{charity}** through **{campaign}**'
      }
    };
  },

  renderProgressBar: function () {
    var page = this.props.result;
    var progress = page.amount && page.target_cents > 0 && Math.min(Math.floor(page.amount.cents / page.target_cents * 100), 100) || 0;

    return (
      <div className="AggregateSearchResultPage__progress">
        <div className="AggregateSearchResultPage__progress__bar" style={{ width: progress + '%' }} />
      </div>
    );
  },

  renderRaisedAmount: function () {
    var page = this.props.result;
    var raised_amount = page.amount && page.target_cents >= 0 &&
      this.tm('raised_amount', {
        currency: page.amount.currency.symbol,
        amount: page.amount.cents / 100,
        target: page.target_cents / 100
      });

    return !!raised_amount && <div className="AggregateSearchResultPage__amount">{ raised_amount }</div>;
  },

  renderRaisedFor: function () {
    var page = this.props.result;
    var raised_for =
      this.tm(pagesAPI.isGivePage(page) ? 'raised_for_charity' : 'raised_for_charity_through_campaign', {
        charity: page.charity.name,
        campaign: page.campaign.name
      });

    return <div className="AggregateSearchResultPage__for">{ raised_for }</div>;
  },

  render: function() {
    var page = this.props.result;

    return (
      <AggregateSearchResult onSelect={ this.props.onSelect } result={ page }>
        <div className="AggregateSearchResultPage__avatar">
          <img src={ page.image.medium_image_url } />
        </div>
        <div className="AggregateSearchResultPage__content">
          <div className="AggregateSearchResultPage__header">
            { page.supporter.name }
            <span className="AggregateSearchResultPage__subheader">{ page.name }</span>
          </div>
          { this.renderProgressBar() }
          { this.renderRaisedAmount() }
          { this.renderRaisedFor() }
        </div>
      </AggregateSearchResult>
    );
  }
});
