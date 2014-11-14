/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSON');
var getJSON = require('../../lib/getJSON');
var results = { results: [], meta: {} };
getJSON.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var charities = require('../charities');

describe('charities', function() {
  var data = {
    au: { country_code: 'au', uid: 'au-123', slug: 'bar' },
    nz: { country_code: 'nz', uid: 'gb-123', slug: 'bar' },
    uk: { country_code: 'uk', uid: 'gb-123', slug: 'bar' },
    us: { country_code: 'us', uid: 'us-123', slug: 'bar' },
  };

  it('find', function() {
    var callback = jest.genMockFunction();
    charities.find('xy-12', callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/charities/xy-12.jsonp', callback);
    expect(callback).toBeCalledWith(results);
  });

  it('findByUids', function() {
    var callback = jest.genMockFunction();
    charities.findByUids(['xy-123', 'xy-456'], callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/charities.jsonp?ids=xy-123,xy-456', callback);
    expect(callback).toBeCalledWith(results);
  });

  it('findByCampaign', function() {
    var callback = jest.genMockFunction();
    charities.findByCampaign('xy-12', 7, 2, callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/charities.jsonp?campaign_ids=xy-12&page=2&limit=7',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });

  it('search searches for charities', function() {
    var query = { searchTerm: 'bar', country: 'xy', campaignUid: [12, 42], page: 2, pageSize: 7 };
    var callback = jest.genMockFunction();
    charities.search(query, callback);

    expect(getJSON).toBeCalledWith(
      'https://everydayhero.com/api/v2/search/charities.jsonp?q=bar&country_code=xy&campaign_id=12,42&page=2&page_size=7',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });

  it('donateUrl defaults to give campaign', function() {
    expect(charities.donateUrl(data['au']))
      .toBe('https://give.everydayhero.com/au/bar/donate');
  });

  it('donateUrl accepts campaign slug', function() {
    expect(charities.donateUrl(data['nz'], 'foo'))
      .toBe('https://foo.everydayhero.com/nz/bar/donate');
  });

  it('fundraiseUrl defaults to give campaign', function() {
    expect(charities.fundraiseUrl(data['uk']))
      .toBe('https://give.everydayhero.com/uk/bar/get-started');
  });

  it('fundraiseUrl accepts campaign slug', function() {
    expect(charities.fundraiseUrl(data['us'], 'foo'))
      .toBe('https://foo.everydayhero.com/us/bar/get-started');
  });
});
