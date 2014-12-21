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

  findByUids: function(campaignUids, callback) {
    if (_.isEmpty(campaignUids)) {
      _.defer(callback, { campaigns: [] });
      return;
    };

    return getJSONP(routes.get('campaigns', { campaignUids: campaignUids }), callback);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    return getJSONP(routes.get('searchCampaigns', params), callback);
  },

  giveCampaignUid: function(country) {
    return giveCampaignUids[country];
  },

  giveCampaignSlug: function() {
    return 'give';
  }
};
