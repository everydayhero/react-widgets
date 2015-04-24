"use strict";

var _        = require('lodash');
var routes   = require('./routes');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  findByCampaign: function(campaignUid, callback, options) {
    var params = _.merge({ campaignUid: campaignUid }, options);
    return getJSONP(routes.get('totals', params), callback);
  }
};
