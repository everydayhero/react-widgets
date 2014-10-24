"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(id, page_count, page_size, type, callback) {
    getJSON(routes('pages', {id: id, page_count: page_count, page_size: page_size, type: type}), callback);
  }
};
