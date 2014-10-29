"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(campaignUid, type, limit, callback) {
    var params = {
      campaignUid: campaignUid,
      type: type,
      limit: limit
    };

    return getJSON(routes.get('campaignLeaderboard', params), callback);
  }
};
