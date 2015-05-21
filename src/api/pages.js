"use strict";

var _         = require('lodash');
var routes    = require('./routes');
var getJSONP  = require('../lib/getJSONP');
var campaigns = require('./campaigns');

module.exports = {
  find: function(pageId, callback, options) {
    var params = _.merge({ pageId: pageId }, options);
    return getJSONP(routes.get('page', params), callback);
  },

  findByIds: function(pageIds, callback, options) {
    var params = _.merge({ pageIds: pageIds }, options);
    return getJSONP(routes.get('pages', params), callback);
  },

  findByCampaign: function(campaignUid, type, limit, page, callback, options) {
    var params = _.merge({
      campaignUid: campaignUid,
      type: type,
      page: page,
      limit: limit
    }, options);

    return getJSONP(routes.get('pages', params), callback);
  },

  findByCampaigns: function(campaignUids, type, limit, page, callback, options) {
    if (_.isEmpty(campaignUids)) {
      _.defer(callback, { campaigns: [] });
      return;
    }

    var pages = [];

    var done = _.after(campaignUids.length, function() {
      return callback({ pages: _.sample(pages, limit) });
    });

    var storePages = function(result) {
      if ("pages" in result) {
        _.forEach(result.pages, function(page) {
          pages.push(page);
        });
      }
      done();
    };

    _.forEach(campaignUids, function(campaignUid) {
      this.findByCampaign(campaignUid, type, limit, page, storePages, options);
    }, this);
  },

  search: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchPages', params), callback, {timeout: 10000});
  },

  isGivePage: function(page) {
    return page.campaign.uid &&
      page.campaign.uid == campaigns.giveCampaignUid(page.country_code);
  }
};
