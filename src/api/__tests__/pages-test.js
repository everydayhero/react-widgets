/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSON');
var getJSON = require('../../lib/getJSON');
var results = { results: [], meta: {} };
getJSON.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var pages = require('../pages');

describe('pages', function() {
  it('find', function() {
    var callback = jest.genMockFunction();
    pages.find('123', callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/pages/123.jsonp', callback);
    expect(callback).toBeCalledWith(results);
  });

  it('findByIds', function() {
    var callback = jest.genMockFunction();
    pages.findByIds(['123', '456'], callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/pages.jsonp?ids=123,456', callback);
    expect(callback).toBeCalledWith(results);
  });

  it('findByCampaign', function() {
    var callback = jest.genMockFunction();
    pages.findByCampaign('xy-12', 'foo', 7, 2, callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/pages.jsonp?campaign_id=xy-12&type=foo&page=2&limit=7',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });

  it('search searches for pages', function() {
    var query = { searchTerm: 'bar', country: 'xy', campaignUid: ['xy-12', 'xy-42'], charityUid: 'xy-123', type: 'foo', page: 2, pageSize: 7 };
    var callback = jest.genMockFunction();
    pages.search(query, callback);

    expect(getJSON).lastCalledWith(
      'https://everydayhero.com/api/v2/search/pages.jsonp' +
        '?q=bar&country_code=xy&campaign_id=xy-12,xy-42&charity_id=xy-123&type=foo&page=2&page_size=7',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });

  it('isGivePage', function() {
    expect(pages.isGivePage({ campaign: { uid: 'au-0' }, country_code: 'au' })).toBeTruthy();
    expect(pages.isGivePage({ campaign: { uid: 'au-1' }, country_code: 'au' })).toBeFalsy();
  });
});
