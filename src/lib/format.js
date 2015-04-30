"use strict";

var numeral = require('numeral');

function format(template, data, strip) {
  if (!data && !strip) {
    return template;
  }

  data = data || {};

  return template.replace(/{([^{}]+)}/g, function(a, b) {
    var parts = b.split(':');
    var format = parts[1];
    var key = parts[0];
    var value = data[key];
    if (value == null) {
      return strip ? '' : a;
    }
    return format ? numeral(value).format(format) : value;
  });
}

module.exports = format;
