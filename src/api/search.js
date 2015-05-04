"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSONP = require('../lib/getJSONP');

module.exports = {
  aggregate: function(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchAggregate', params), callback, {timeout: 10000});
  }
};
