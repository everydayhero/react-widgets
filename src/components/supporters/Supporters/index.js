"use strict";

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');
var DOMInfo       = require('../../mixins/DOMInfo');
var I18n          = require('../../mixins/I18n');
var campaigns     = require('../../../api/campaigns');
var charities     = require('../../../api/charities');
var SupporterCard = require('../SupporterCard');

module.exports = React.createClass({
  displayName: "Supporters",

  mixins: [I18n, DOMInfo],

  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    type: React.PropTypes.oneOf(['team', 'individual']),
    hideCharityName: React.PropTypes.bool,
    hideEventName: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      type: 'individual',
      hideCharityName: false,
      hideEventName: false,
      defaultI18n: {
        title: 'Our Top Supporters'
      }
    };
  },

  getInitialState: function() {
    return {
      pages: [],
      cancelLoad: function() {}
    };
  },

  componentDidMount: function() {
    this.loadPages();
  },

  componentWillUnmount: function() {
    this.state.cancelLoad();
  },

  getEndpoint: function() {
    var endpoint;

    var props = this.props;
    if (props.country) {
      if (props.campaignSlug) { endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug); }
      if (props.charitySlug)  { endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug); }
    } else {
      if (props.campaignUid)  { endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid); }
      if (props.campaignUids) { endpoint = campaigns.leaderboardByUids.bind(campaigns, props.campaignUids); }
      if (props.charityUid)   { endpoint = charities.leaderboard.bind(charities, props.charityUid); }
    }

    if (!endpoint && console && console.log) {
      console.log("Supporters widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadPages: function() {
    var endpoint = this.getEndpoint();
    var cancelLoad = endpoint(this.props.type, 20, this.onSuccess, { includePages: true, includeFootprint: true });
    this.setState({ cancelLoad: cancelLoad });
  },

  onSuccess: function(result) {

    console.log(result);

    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];

    this.setState({
      pages: pages
    });
  },

  renderSupporterCards: function() {
    var props = this.props;
    var state = this.state;
    var pages = state.pages;

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
        charityName={ !props.hideCharityName ? page.charity_name : '' }
        eventName={ !props.hideEventName ? page.campaign_name : '' }
        target={ page.target_cents / 100 }
        current={ page.amount.cents / 100 }
        currency={ page.amount.currency.symbol } />;
    });
  },

  render: function() {
    var show = !_.isEmpty(this.state.pages);

    return (
      <div className="Supporters">
        { show && <h2 className="Supporters__title">{ this.t('title') }</h2> }
        { show && this.renderSupporterCards() }
      </div>
    );
  }
});
