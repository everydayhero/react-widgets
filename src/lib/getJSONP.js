"use strict";

var jsonp = require('jsonp');

function getJSONP(url, callback) {
  return jsonp(url, {}, function(error, data) {
    callback(error ? null : data);
  });
}

module.exports = getJSONP;
