var format = require('./format');
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

  return value && format(value, params);
}

module.exports = {
  t: translate
};
