"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');

var address = require('../address');

describe('address', function() {
  beforeEach(function() {
    getJSONP.mockClear();
  });

  it('find', function() {
    var callback = jest.genMockFunction();
    var result = address.find('123', 'uk', callback);

    expect(getJSONP).lastCalledWith(
      'https://everydayhero.com/api/v2/addresses/uk/123.jsonp', callback);
  });

  it('search searches for addresses', function() {
    var callback = jest.genMockFunction();
    var result = address.search('blah', 'uk', callback);

    expect(getJSONP).lastCalledWith(
      'https://everydayhero.com/api/v2/addresses.jsonp?country_code=uk&q=blah', callback);
  });
});
