"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(id, type, limit, callback) {
    getJSON(routes('leaderboard', {id: id, type: type, limit: limit}), callback);
  }
};
