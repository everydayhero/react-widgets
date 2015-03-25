"use strict";

var jsonp = require('jsonp');
var DEFAULT_TIMEOUT = 20000;
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};
var cache = {};

function getJSONP(url, callback) {
  if (cache[url]) {
    setTimeout(function() { callback(cache[url]); }, 0);
    return noop;
  }

  return jsonp(url, {timeout: DEFAULT_TIMEOUT}, function(error, data) {
    if (error) {
      callback(null);
    } else {
      cache[url] = data;
      callback(data);
    }
  });
}

module.exports = IS_CLIENT ? getJSONP : function() { return noop; };
