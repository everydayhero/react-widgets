"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

var giveCampaignUids = {
  'au': 'au-0',
  'nz': 'nz-0',
  'uk': 'gb-0',
  'us': 'us-0'
};

module.exports = {
  find: function(campaignUid, callback) {
    return getJSONP(routes.get('campaign', { campaignUid: campaignUid }), callback);
  },

  findBySlug: function(country, campaignSlug, callback) {
    return this.find(country + '/' + campaignSlug, callback);
  },

  findByUids: function(campaignUids, callback) {
    if (_.isEmpty(campaignUids)) {
      _.defer(callback, { campaigns: [] });
      return;
    }

    return getJSONP(routes.get('campaigns', { campaignUids: campaignUids }), callback);
  },

  findByCharity: function(charityUid, page, limit, callback) {
    var params = {
      charityUid: charityUid,
      sortBy: 'finish_at',
      status: 'active',
      excludeBau: true,
      page: page,
      limit: limit
    };
    return getJSONP(routes.get('campaigns', params), callback);
  },

  leaderboard: function(campaignUid, type, limit, callback, options) {
    var params = _.merge({
      campaignUid: campaignUid,
      type: type,
      limit: limit
    }, options);
    return getJSONP(routes.get('campaignLeaderboard', params), callback);
  },

  leaderboardBySlug: function(country, campaignSlug, type, limit, callback, options) {
    return this.leaderboard(country + '/' + campaignSlug, type, limit, callback, options);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchCampaigns', params), callback);
  },

  giveCampaignUid: function(country) {
    return giveCampaignUids[country];
  },

  giveCampaignSlug: function() {
    return 'give';
  }
};
