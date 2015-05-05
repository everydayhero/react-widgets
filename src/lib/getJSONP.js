"use strict";

var _ = require('lodash');
var jsonp = require('jsonp');
var DEFAULT_TIMEOUT = 20000;
var IS_CLIENT = typeof window !== 'undefined';
var noop = function() {};
var cache = {};

function getJSONP(url, callback, options) {
  if (cache[url]) {
    _.defer(callback, cache[url]);
    return noop;
  }

  options = options || {};
  var timeout = options.timeout || DEFAULT_TIMEOUT;

  return jsonp(url, {timeout: timeout}, function(error, data) {
    if (error) {
      callback(null);
    } else {
      cache[url] = data;
      _.defer(callback, data);
    }
  });
}

module.exports = IS_CLIENT ? getJSONP : function() { return noop; };
