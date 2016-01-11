"use strict";

var _        = require('lodash');
var routes   = require('./routes');
var getJSONP = require('../lib/getJSONP');

function customJoin(ids, joinString) {
  ids = _.isString(ids) ? [ids] : ids;
  return ids.length > 1 ? ids.join(joinString) : ids[0];
}

module.exports = {
  findByCampaigns: function(params, callback, options) {
    var campaignUids = params.campaignUids ? customJoin(params.campaignUids, '&campaign_id[]=') : undefined;
    var groupValues = params.groupValues ? customJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ campaignUid: campaignUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  },

  findByPages: function(pageIds, callback, options) {
    pageIds = customJoin(pageIds, '&page_id[]=');
    var params = _.merge({ page: pageIds }, options);

    return getJSONP(routes.get('totals', params), callback);
  },

  findByCharities: function(params, callback, options) {
    var charityUids = params.charityUids ? customJoin(params.charityUids, '&charity_id[]=') : undefined;
    var groupValues = params.groupValues ? customJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ charityUid: charityUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  }
};
