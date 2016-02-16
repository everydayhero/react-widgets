'use strict';
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {}};
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var search = require('../search');

describe('search', function() {
  beforeEach(function() {
    getJSONP.mockClear();
  });

  describe('aggregate', function() {
    it('searches for everything', function() {
      var query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7, minimumScore: 0.05 };
      var callback = jest.genMockFunction();
      search.aggregate(query, callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/search/aggregate.jsonp' +
          '?q=bar&country_code=xy&page=2&page_size=7&minimum_score=0.05',
        callback, { timeout: 10000 }
      );
      expect(callback).toBeCalledWith(results);
    });
  });
});
