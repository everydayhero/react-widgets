"use strict";

var _                   = require('lodash');
var React               = require('react');
var Icon                = require('../../helpers/Icon');
var I18nMixin           = require('../../mixins/I18n');
var DOMInfoMixin        = require('../../mixins/DOMInfo');
var campaigns           = require('../../../api/campaigns');
var charities           = require('../../../api/charities');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');
var SupporterCard       = require('../SupporterCard');

module.exports = React.createClass({
  displayName: "Supporters",

  mixins: [I18nMixin, DOMInfoMixin],

  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    type: React.PropTypes.oneOf(['team', 'individual']),
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      type: 'individual',
      backgroundColor: '#EBEBEB',
      defaultI18n: {
        emptyLabel: 'No supporters to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: true,
      pages: []
    };
  },

  componentWillMount: function() {
    this.loadPages();
  },

  getEndpoint: function() {
    var endpoint;

    var props = this.props;
    if (props.country) {
      if (props.campaignSlug) { endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug); }
      if (props.charitySlug)  { endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug); }
    } else {
      if (props.campaignUid)  { endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid); }
      if (props.charityUid)   { endpoint = charities.leaderboard.bind(charities, props.charityUid); }
    }

    if (!endpoint && console && console.log) {
      console.log("Supporters widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadPages: function() {
    var endpoint = this.getEndpoint();
    endpoint(this.props.type, 20, this.onSuccess, { includePages: true, includeFootprint: true });
  },

  onSuccess: function(result) {
    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];

    this.setState({
      isLoading: false,
      pages: pages
    });
  },

  renderSupporterCards: function() {
    var state = this.state;

    if (state.isLoading) {
      return <Icon className="Supporters__loading" icon="circle-o-notch" />;
    }

    var pages = state.pages;
    if (_.isEmpty(pages)) {
      return <p className="Supporters__empty-label">{ this.t('emptyLabel') }</p>;
    }

    var count = this.getChildCountFromWidth(180);
    var width = this.getChildWidth(count);

    return _.map(_.take(pages, Math.max(count, 2)), function(page) {
      return <SupporterCard
        key={ page.id }
        footprint={ page.owner_footprint }
        width={ width }
        url={ page.url }
        image={ page.image.large_image_url }
        name={ page.name }
        target={ page.target_cents / 100 }
        current={ page.amount.cents / 100 }
        currency={ page.amount.currency.symbol } />;
    });
  },

  render: function() {
    return (
      <div className="Supporters">
        { this.renderSupporterCards() }
      </div>
    );
  }
});
