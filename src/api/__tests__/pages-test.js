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
  it('isGivePage', function() {
    expect(pages.isGivePage({ campaign: { uid: 'au-0' }, country_code: 'au' })).toBeTruthy();
    expect(pages.isGivePage({ campaign: { uid: 'au-1' }, country_code: 'au' })).toBeFalsy();
  });

  it('search searches for pages', function() {
    var query = { searchTerm: 'bar', country: 'xy', campaignUid: ['xy-12', 'xy-42'], page: 2, pageSize: 7 };
    var callback = jest.genMockFunction();

    pages.search(query, callback);

    expect(getJSON).toBeCalledWith(
      'https://everydayhero.com/api/v2/search/pages.jsonp?q=bar&country_code=xy&campaign_id=xy-12,xy-42&charity_id=&type=&page=2&page_size=7',
      jasmine.any(Function)
    );
    expect(callback).toBeCalledWith(results);
  });
});
