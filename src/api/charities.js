"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(charityUid, callback) {
    return getJSON(routes('charity', { charityUid: charityUid }), callback);
  },

  findByCampaign: function(campaignUid, limit, page, callback) {
    var params = {
      campaignUid: campaignUid,
      page: page,
      limit: limit
    };
    return getJSON(routes('charities', params), callback);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    return getJSON(routes('searchCharities', params), callback);
  },

  donateUrl: function(charity) {
    return routes('donate', {
      country: charity.country_code,
      charityId: charity.uid.split('-')[1]
    });
  },

  fundraiseUrl: function(campaignSlug, charity) {
    return routes('fundraise', {
      country: charity.country_code,
      campaignSlug: campaignSlug,
      charitySlug: charity.slug
    });
  }
};
