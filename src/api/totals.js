"use strict";

var _         = require('lodash');
var routes    = require('./routes');
var getJSONP  = require('../lib/getJSONP');
var paramJoin = require('../lib/paramJoin');

module.exports = {
  findByCampaigns: function(params, callback, options) {
    var campaignUids = params.campaignUids ? paramJoin(params.campaignUids, '&campaign_id[]=') : undefined;
    var groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ campaignUid: campaignUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  },

  findByPages: function(pageIds, callback, options) {
    pageIds = paramJoin(pageIds, '&page_id[]=');
    var params = _.merge({ page: pageIds }, options);

    return getJSONP(routes.get('totals', params), callback);
  },

  findByCharities: function(params, callback, options) {
    var charityUids = params.charityUids ? paramJoin(params.charityUids, '&charity_id[]=') : undefined;
    var groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ charityUid: charityUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  },

  findByAll: function(params, callback, options) {
    var charityUids = params.charityUids ? paramJoin(params.charityUids, '&charity_id[]=') : undefined;
    var campaignUids = params.campaignUids ? paramJoin(params.campaignUids, '&campaign_id[]=') : undefined;
    var groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ charityUid: charityUids, campaignUid: campaignUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  }
};
