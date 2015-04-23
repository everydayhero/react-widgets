"use strict";

var _         = require('lodash');
var format    = require('./format');
var separator = '.';

function lookup(object, key) {
  var value = object;
  var keys = key.split(separator);

  for (var i = 0; value && i < keys.length; ++i) {
    value = value[keys[i]];
  }
  return value;
}

function translate(i18n, key, params) {
  var scope = params && params.scope;
  var value = scope && lookup(i18n, scope + separator + key) || lookup(i18n, key);

  if (params && params.count !== undefined && _.isObject(value)) {
    var pluralisation = params.count == 1 ? 'one' : 'other';
    value = value[pluralisation];
  }

  return value && format(value, params);
}

module.exports = {
  t: translate
};
