"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSON = require('../lib/getJSON');

var giveCampaignUids = {
  'au': 'au-0',
  'nz': 'nz-0',
  'uk': 'gb-0',
  'us': 'us-0'
};

module.exports = {
  find: function(campaignUid, callback) {
    return getJSON(routes.get('campaign', { campaignUid: campaignUid }), callback);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    return getJSON(routes.get('searchCampaigns', params), callback);
  },

  giveCampaignUid: function(country) {
    return giveCampaignUids[country];
  },

  giveCampaignSlug: function() {
    return 'give';
  }
};
