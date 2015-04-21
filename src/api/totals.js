"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  findByCampaign: function(campaignUid, start, end, callback) {
    var params = _.merge({
      campaignUid: campaignUid,
      start: start,
      end: end
    });

    return getJSONP(routes.get('totals', params), callback);
  }
};
