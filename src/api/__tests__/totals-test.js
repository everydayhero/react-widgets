'use strict';
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {}};
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var totals = require('../totals');

describe('totals', function() {
  beforeEach(function() {
    getJSONP.mockClear();
  });

  describe('findByCampaigns', function() {
    it('gets total from campaign id', function() {
      var callback = jest.genMockFunction();
      totals.findByCampaigns({ campaignUids: 'us-22' }, callback);

      expect(getJSONP).lastCalledWith('https://everydayhero.com/api/v2/search/totals.jsonp?campaign_id[]=us-22', callback);
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });

    it('gets total from multiple campaign uids', function() {
      var callback = jest.genMockFunction();
      totals.findByCampaigns({ campaignUids: ['xx-123','yy-123'] }, callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?campaign_id[]=xx-123&campaign_id[]=yy-123', callback
      );
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('findByPage', function() {
    it('gets total from page id', function() {
      var callback = jest.genMockFunction();
      totals.findByPages('848751', callback);

      expect(getJSONP).lastCalledWith('https://everydayhero.com/api/v2/search/totals.jsonp?page_id[]=848751', callback);
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('findByCharity', function() {
    it('gets total from charity id', function() {
      var callback = jest.genMockFunction();
      totals.findByCharities({ charityUids: 'au-31' }, callback);

      expect(getJSONP).lastCalledWith('https://everydayhero.com/api/v2/search/totals.jsonp?charity_id[]=au-31', callback);
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('filterOnGroups', function() {
    it('gets total from charity id, filtered on a group', function() {
      var callback = jest.genMockFunction();
      totals.findByCharities({
        charityUids: 'au-31',
        groupValues: 'SchoolName'
      }, callback);

      expect(getJSONP).lastCalledWith('https://everydayhero.com/api/v2/search/totals.jsonp?charity_id[]=au-31&group_value[]=SchoolName', callback);
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });

    it('gets total from charity id, filtered on multiple groups', function() {
      var callback = jest.genMockFunction();
      totals.findByCharities({
        charityUids: 'au-31',
        groupValues: ['SchoolName', 'ABC']
      }, callback);

      expect(getJSONP).lastCalledWith('https://everydayhero.com/api/v2/search/totals.jsonp?charity_id[]=au-31&group_value[]=SchoolName&group_value[]=ABC', callback);
      expect(callback).toBeCalledWith(results);
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
