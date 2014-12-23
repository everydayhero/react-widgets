"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {} };
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var charities = require('../charities');

describe('charities', function() {
  var data = {
    au: { country_code: 'au', uid: 'au-123', slug: 'bar' },
    nz: { country_code: 'nz', uid: 'gb-123', slug: 'bar' },
    uk: { country_code: 'uk', uid: 'gb-123', slug: 'bar' },
    us: { country_code: 'us', uid: 'us-123', slug: 'bar' },
  };

  beforeEach(function() {
    getJSONP.mockClear();
  });

  describe('find', function() {
    it('gets a charity by uid', function() {
      var callback = jest.genMockFunction();
      charities.find('xy-12', callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/charities/xy-12.jsonp', callback);
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('findByUids', function() {
    it('gets charities by uid', function() {
      var callback = jest.genMockFunction();
      charities.findByUids(['xy-123', 'xy-456'], callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/charities.jsonp?ids=xy-123,xy-456', callback);
      expect(callback).toBeCalledWith(results);
    });

    describe('with empty array', function() {
      var callback;

      beforeEach(function() {
        callback = jest.genMockFunction();
        charities.findByUids([], callback);
      });

      it('does not fetch', function() {
        expect(getJSONP).not.toBeCalled();
      });

      it('defers callback with empty results', function() {
        expect(callback).not.toBeCalled();

        jest.runOnlyPendingTimers();

        expect(callback).toBeCalledWith({ charities: [] });
      });
    });
  });

  describe('findByCampaign', function() {
    it('gets charities by campaign uid', function() {
      var callback = jest.genMockFunction();
      charities.findByCampaign('xy-12', 7, 2, callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/charities.jsonp?campaign_ids=xy-12&page=2&limit=7',
        callback
      );
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('search', function() {
    it('searches for charities', function() {
      var query = { searchTerm: 'bar', country: 'xy', campaignUid: [12, 42], page: 2, pageSize: 7 };
      var callback = jest.genMockFunction();
      charities.search(query, callback);

      expect(getJSONP).toBeCalledWith(
        'https://everydayhero.com/api/v2/search/charities.jsonp?q=bar&country_code=xy&campaign_id=12,42&page=2&page_size=7',
        callback
      );
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('donateUrl', function() {
    it('defaults to give campaign', function() {
      expect(charities.donateUrl(data.au))
        .toBe('https://give.everydayhero.com/au/bar/donate');
    });

    it('accepts campaign slug', function() {
      expect(charities.donateUrl(data.nz, 'foo'))
        .toBe('https://foo.everydayhero.com/nz/bar/donate');
    });
  });

  describe('fundraiseUrl', function() {
    it('defaults to give campaign', function() {
      expect(charities.fundraiseUrl(data.uk))
        .toBe('https://give.everydayhero.com/uk/bar/get-started');
    });

    it('accepts campaign slug', function() {
      expect(charities.fundraiseUrl(data.us, 'foo'))
        .toBe('https://foo.everydayhero.com/us/bar/get-started');
    });
  });
});
