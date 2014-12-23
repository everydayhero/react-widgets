"use strict";

var _ = require('lodash');
var routes = require('./routes');
var campaigns = require('./campaigns');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  find: function(charityUid, callback) {
    return getJSONP(routes.get('charity', { charityUid: charityUid }), callback);
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

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    return getJSONP(routes.get('searchCharities', params), callback);
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
