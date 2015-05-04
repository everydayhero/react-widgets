"use strict";

var _ = require('lodash');
var routes = require('./routes');
var campaigns = require('./campaigns');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  find: function(charityUid, callback) {
    return getJSONP(routes.get('charity', { charityUid: charityUid }), callback);
  },

  findBySlug: function(country, charitySlug, callback) {
    return this.find(country + '/' + charitySlug, callback);
  },

  findByUids: function(charityUids, callback) {
    if (_.isEmpty(charityUids)) {
      _.defer(callback, { charities: [] });
      return;
    }

    return getJSONP(routes.get('charities', { charityUids: charityUids }), function(response) {
      _.each(response.charities, function(charity) {
        charity.uid = charity.id;
      });
      callback(response);
    });
  },

  findByCampaign: function(campaignUid, limit, page, callback) {
    var params = {
      campaignUid: campaignUid,
      page: page,
      limit: limit
    };
    return getJSONP(routes.get('charities', params), callback);
  },

  leaderboard: function(charityUid, type, limit, callback, options) {
    var params = _.merge({
      charityUid: charityUid,
      type: type,
      limit: limit
    }, options);
    return getJSONP(routes.get('charityLeaderboard', params), callback);
  },

  leaderboardBySlug: function(country, charitySlug, type, limit, callback, options) {
    return this.leaderboard(country + '/' + charitySlug, type, limit, callback, options);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchCharities', params), callback, {timeout: 10000});
  },

  donateUrl: function(charity, campaignSlug) {
    return routes.get('donate', {
      country: charity.country_code,
      campaignSlug: campaignSlug || campaigns.giveCampaignSlug(),
      charitySlug: charity.slug
    });
  },

  fundraiseUrl: function(charity, campaignSlug) {
    return routes.get('fundraise', {
      country: charity.country_code,
      campaignSlug: campaignSlug || campaigns.giveCampaignSlug(),
      charitySlug: charity.slug
    });
  }
};
