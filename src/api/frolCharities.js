"use strict";

var getJSONP     = require('../lib/getJSONP');
var _            = require('lodash');
var cachedResult;

var url = 'https://spreadsheets.google.com/feeds/list/1FnIPOD3M1lQXFkERRl_tdGz5XXZ3AmNdBCaLPpcClFI/od6/public/values?alt=json-in-script';

function getCharities(callback) {
  if (cachedResult) {
    setTimeout(function() {
      callback(cachedResult);
    });

    return;
  }

  getJSONP(url, function(data) {
    var transformedData = [];
    var entries = data.feed.entry;

    for (var i = 0; i < entries.length; i++) {
      transformedData.push({
        name: entries[i].gsx$name.$t,
        frolId: entries[i].gsx$frolid.$t,
        slug: entries[i].gsx$slug.$t,
        description: entries[i].gsx$description.$t,
        logoUrl: entries[i].gsx$logourl.$t,
        url: entries[i].gsx$url.$t
      });
    }

    cachedResult = transformedData;
    callback(transformedData);
  });
}

function search(properties, callback) {
  getCharities(function(charities) {
    var results = properties.searchTerm === '' ? charities : _.filter(charities, function(charity){
      return charity.name.search(new RegExp(properties.searchTerm, 'gim')) >= 0;
    });

    var count = results.length;
    var totalPages = count / properties.pageSize;
    var endIndex = (properties.page * properties.pageSize);
    var beginIndex =  endIndex - properties.pageSize;
    var meta = {
      pagination: {
        current_page: properties.page,
        count: count,
        total_pages: Math.ceil(results.length / properties.pageSize),
        first_page: properties.page === 1,
        last_page: properties.page === totalPages && count !== 0
      }
    };

    callback({
      charities: results.slice(beginIndex, endIndex),
      meta: meta
    });
  });
}

module.exports = {
  search: search
};
