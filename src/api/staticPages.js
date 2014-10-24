"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(id, type, limit, page, callback) {
    getJSON(routes('staticPages', {id: id, type: type, limit: limit, page: page}), callback);
  }
};
