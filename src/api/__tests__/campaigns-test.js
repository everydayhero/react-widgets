"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {} };
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var campaigns = require('../campaigns');

describe('campaigns', function() {
  it('find', function() {
    var callback = jest.genMockFunction();
    campaigns.find('xy-12', callback);

    expect(getJSONP).lastCalledWith(
      'https://everydayhero.com/api/v2/campaigns/xy-12.jsonp', callback);
    expect(callback).toBeCalledWith(results);
  });

  it('`search` searches for campaigns', function() {
    var query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7 };
    var callback = jest.genMockFunction();
    campaigns.search(query, callback);

    expect(getJSONP).toBeCalledWith(
      'https://everydayhero.com/api/v2/search/campaigns.jsonp?q=bar&country_code=xy&page=2&page_size=7',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });

  it('giveCampaignUid', function() {
    expect(campaigns.giveCampaignUid('au')).toBe('au-0');
    expect(campaigns.giveCampaignUid('nz')).toBe('nz-0');
    expect(campaigns.giveCampaignUid('uk')).toBe('gb-0');
    expect(campaigns.giveCampaignUid('us')).toBe('us-0');
    expect(campaigns.giveCampaignUid('xy')).toBeUndefined();
  });
});
