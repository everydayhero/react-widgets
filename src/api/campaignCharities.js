"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(id, callback) {
    getJSON(routes('campaignCharities', {id: id}), callback);
  }
};
