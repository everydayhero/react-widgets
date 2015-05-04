"use strict";

var jsonp = require('jsonp');
var DEFAULT_TIMEOUT = 20000;
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};
var cache = {};

function getJSONP(url, callback, options) {
  if (cache[url]) {
    setTimeout(function() { callback(cache[url]); }, 0);
    return noop;
  }

  options = options || {};
  var timeout = options.timeout || DEFAULT_TIMEOUT;

  return jsonp(url, {timeout: timeout}, function(error, data) {
    if (error) {
      callback(null);
    } else {
      cache[url] = data;
      callback(data);
    }
  });
}

module.exports = IS_CLIENT ? getJSONP : function() { return noop; };
