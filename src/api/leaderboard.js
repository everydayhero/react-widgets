"use strict";

var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  find: function(campaignUid, type, limit, callback) {
    var params = {
      campaignUid: campaignUid,
      type: type,
      limit: limit
    };

    return getJSONP(routes.get('campaignLeaderboard', params), callback);
  }
};
