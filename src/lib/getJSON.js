var jsonp = require('jsonp');

function getJSON(url, callback) {
  return jsonp(url, {}, function(error, data) {
    callback(error ? null : data);
  });
}

module.exports = getJSON;
