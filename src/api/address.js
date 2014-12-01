"use strict";

var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  find: function(id, country, callback) {
    return getJSONP(routes.get('address', { id: id, country: country }), callback);
  },

  search: function(searchTerm, country, callback) {
    var query = { searchTerm: searchTerm, country: country };
    return getJSONP(routes.get('searchAddresses', query), callback);
  }
};
