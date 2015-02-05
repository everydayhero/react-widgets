"use strict";

var jsonp = require('jsonp');
var DEFAULT_TIMEOUT = 20000;

function getJSONP(url, callback) {
  return jsonp(url, {timeout: DEFAULT_TIMEOUT}, function(error, data) {
    callback(error ? null : data);
  });
}

module.exports = getJSONP;
