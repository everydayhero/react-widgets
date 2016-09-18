import getJSONP from '../lib/getJSONP';
import _ from 'lodash';

let cachedResult;

const url = 'https://spreadsheets.google.com/feeds/list/1FnIPOD3M1lQXFkERRl_tdGz5XXZ3AmNdBCaLPpcClFI/od6/public/values?alt=json-in-script';

function getCharities(callback) {
  if (cachedResult) {
    setTimeout(function() {
      callback(cachedResult);
    });

    return;
  }

  getJSONP(url, function(data) {
    let transformedData = [];
    let entries = data.feed.entry;

    for (let i = 0; i < entries.length; i++) {
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
    let results = properties.searchTerm === '' ? charities : _.filter(charities, function(charity){
      return charity.name.search(new RegExp(properties.searchTerm, 'gim')) >= 0;
    });

    let count = results.length;
    let totalPages = count / properties.pageSize;
    let endIndex = (properties.page * properties.pageSize);
    let beginIndex =  endIndex - properties.pageSize;
    let meta = {
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

export default {
  search: search
};
