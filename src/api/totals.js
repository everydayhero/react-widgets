"use strict";

var _        = require('lodash');
var routes   = require('./routes');
var getJSONP = require('../lib/getJSONP');

function customJoin(ids, joinString) {
  ids = _.isString(ids) ? [ids] : ids;
  return ids.length > 1 ? ids.join(joinString) : ids[0];
}

module.exports = {
  findByCampaigns: function(campaignUids, callback) {
    campaignUids = customJoin(campaignUids, '&campaign_id[]=');
    var params = _.merge({ campaignUid: campaignUids });
    return getJSONP(routes.get('totals', params), callback);
  },

  findByPages: function(pageIds, callback, options) {
    pageIds = customJoin(pageIds, '&page_id[]=');
    var params = _.merge({ page: pageIds }, options);
    return getJSONP(routes.get('totals', params), callback);
  },

  findByCharities: function(charityUids, callback, options) {
    charityUids = customJoin(charityUids, '&charity_id[]=');
    var params = _.merge({ charityUid: charityUids }, options);
    return getJSONP(routes.get('totals', params), callback);
  }
};
