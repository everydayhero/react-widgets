"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSON = require('../lib/getJSON');
var campaigns = require('./campaigns');

module.exports = {
  find: function(pageId, callback) {
    return getJSON(routes.get('page', { pageId: pageId }), callback);
  },

  findByIds: function(pageIds, callback) {
    return getJSON(routes.get('pages', { pageIds: pageIds }), callback);
  },

  findByCampaign: function(campaignUid, type, limit, page, callback) {
    var params = {
      campaignUid: campaignUid,
      type: type,
      page: page,
      limit: limit
    };
    return getJSON(routes.get('pages', params), callback);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    return getJSON(routes.get('searchPages', params), callback);
  },

  isGivePage: function(page) {
    return page.campaign.uid &&
      page.campaign.uid == campaigns.giveCampaignUid(page.country_code);
  }
};
