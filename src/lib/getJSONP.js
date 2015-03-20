"use strict";

var jsonp = require('jsonp');
var DEFAULT_TIMEOUT = 20000;
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};

function getJSONP(url, callback) {
  return jsonp(url, {timeout: DEFAULT_TIMEOUT}, function(error, data) {
    callback(error ? null : data);
  });
}

module.exports = IS_CLIENT ? getJSONP : function() { return noop; };
