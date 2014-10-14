"use strict";

var _ = require('lodash');
var routes = require('./routes');
var getJSON = require('../lib/getJSON');

module.exports = {
  findAll: function(query, callback) {
    var params = {
      q: encodeURIComponent(query.searchTerm),
      country_code: query.country,
      campaign_id: _.compact(query.campaignUids || []).join(','),
      page: query.page,
      page_size: query.pageSize
    };

    params = _.map(params, function(value, key) {
      return key + '=' + (value == null ? '' : value);
    }).join('&');

    getJSON(routes('charities') + '?' + params, callback);
  }
};
