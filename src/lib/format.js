"use strict";

function format(template, data, strip) {
  if (!data) {
    return template;
  }

  return template.replace(/{([^{}]+)}/g, function(a, b) {
    var r = data[b];
    return (r !== null && r !== undefined) ? r : strip ? '' : a;
  });
}

module.exports = format;
