"use strict";

var _ = require('lodash');

function toString(obj) {
  return _.map(obj, function(value, key) {
    return key + '=' + value;
  }).join(',');
}

function openPopup(url, config) {
  var windowTop  = window.screenTop ? window.screenTop : window.screenY;
  var windowLeft = window.screenLeft ? window.screenLeft : window.screenX;

  config.top  = windowTop + (window.innerHeight / 2) - (config.height / 2);
  config.left = windowLeft + (window.innerWidth / 2) - (config.width / 2);
  config      = toString(config);

  var windowRef = window.open(url, 'shareWindow', config);
}

module.exports = openPopup;
