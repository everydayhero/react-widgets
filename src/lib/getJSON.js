var get = require('./get');

function getJSON(url, callback) {
  get(url, function(data) {
    var json = JSON.parse(data);
    callback(json);
  });
}

module.exports = getJSON;
