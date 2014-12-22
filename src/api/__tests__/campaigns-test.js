"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {} };
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var campaigns = require('../campaigns');

describe('campaigns', function() {
  beforeEach(function() {
    getJSONP.mockClear();
  });

  describe('find', function() {
    it('gets a campaign by uid', function() {
      var callback = jest.genMockFunction();
      campaigns.find('xy-12', callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/campaigns/xy-12.jsonp', callback);
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('findByUids', function() {
    it('gets campaigns by uid', function() {
      var callback = jest.genMockFunction();
      campaigns.findByUids(['xy-123', 'xy-456'], callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/campaigns.jsonp?ids=xy-123,xy-456', callback);
      expect(callback).toBeCalledWith(results);
    });

    describe('with empty array', function() {
      var callback;

      beforeEach(function() {
        callback = jest.genMockFunction();
        campaigns.findByUids([], callback);
      });

      it('does not fetch results', function() {
        expect(getJSONP).not.toBeCalled();
      })

      it('defers callback with empty results', function() {
        expect(callback).not.toBeCalled();

        jest.runOnlyPendingTimers();

        expect(callback).toBeCalledWith({ campaigns: [] });
      })
    });
  });

  describe('search', function() {
    it('searches for campaigns', function() {
      var query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7 };
      var callback = jest.genMockFunction();
      campaigns.search(query, callback);

      expect(getJSONP).toBeCalledWith(
        'https://everydayhero.com/api/v2/search/campaigns.jsonp?q=bar&country_code=xy&page=2&page_size=7',
        callback
      );
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('giveCampaignUid', function() {
    it('returns uid for give campaign', function() {
      expect(campaigns.giveCampaignUid('au')).toBe('au-0');
      expect(campaigns.giveCampaignUid('nz')).toBe('nz-0');
      expect(campaigns.giveCampaignUid('uk')).toBe('gb-0');
      expect(campaigns.giveCampaignUid('us')).toBe('us-0');
      expect(campaigns.giveCampaignUid('xy')).toBeUndefined();
    });
  });
});
