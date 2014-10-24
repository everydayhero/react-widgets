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
  }

  it('donateUrl', function() {
    expect(charities.donateUrl(data.au)).toBe('https://heroix.everydayhero.com.au/charities/123/donate');
    expect(charities.donateUrl(data.uk)).toBe('https://heroix.everydayhero.co.uk/charities/123/donate');
    expect(charities.donateUrl(data.nz)).toBe('https://heroix.everydayhero.co.nz/charities/123/donate');
    expect(charities.donateUrl(data.us)).toBeUndefined();
  });

  it('fundraiseUrl', function() {
    for (var country in data) {
      expect(charities.fundraiseUrl('foo', data[country]))
        .toBe('https://foo.everydayhero.com/' + country + '/bar/get-started');
    }
  });

  it('search searches for charities', function() {
    var query = { searchTerm: 'bar', country: 'xy', campaignUid: [12, 42], page: 2, pageSize: 7 };
    var callback = jest.genMockFunction();

    charities.search(query, callback);

    expect(getJSON).toBeCalledWith(
      'https://everydayhero.com/api/v2/search/charities.jsonp?q=bar&country_code=xy&campaign_id=12,42&page=2&page_size=7',
      jasmine.any(Function)
    );
    expect(callback).toBeCalledWith(results);
  });
});
