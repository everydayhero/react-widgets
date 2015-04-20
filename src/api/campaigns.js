"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

var giveCampaignUids = {
  'au': 'au-0',
  'ie': 'ie-0',
  'nz': 'nz-0',
  'uk': 'gb-0',
  'us': 'us-0'
};

module.exports = {
  find: function(campaignUid, callback, options) {
    var params = _.merge({
      campaignUid: campaignUid
    }, options);

    return getJSONP(routes.get('campaign', params), callback);
  },

  findBySlug: function(country, campaignSlug, callback, options) {
    return this.find(country + '/' + campaignSlug, callback, options);
  },

  findByUids: function(campaignUids, callback, options) {
    if (_.isEmpty(campaignUids)) {
      _.defer(callback, { campaigns: [] });
      return;
    }

    var params = _.merge({
      campaignUids: campaignUids
    }, options);

    return getJSONP(routes.get('campaigns', params), callback);
  },

  findByCharity: function(charityUid, page, limit, callback, options) {
    var params = options || {};
    params.charityUid = charityUid;
    if (page) { params.page = page; }
    if (limit) { params.limit = limit; }
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
