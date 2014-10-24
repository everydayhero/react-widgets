"use strict";

var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  find: function(id, callback) {
    getJSON(routes('campaigns', {id: id}), callback);
  }
};
