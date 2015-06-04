"use strict";
jest.autoMockOff();

jest.mock('jsonp');
var jsonp = require('jsonp');
jsonp.mockImplementation(function(url, options, callback) { callback('error', null); });

var getJSONP = require('../getJSONP');

describe('getJSONP', function() {
  beforeEach(function() {
    jsonp.mockClear();
  });

  it('retries a default of 2 times', function() {
    var callback = jest.genMockFunction();
    var cancelCallback = getJSONP('http://blah.com', callback);
    expect(jsonp.mock.calls.length).toBe(3);
    expect(callback).lastCalledWith(null);
  });

  it('accepts number of retries', function() {
    var callback = jest.genMockFunction();
    var cancelCallback = getJSONP('http://blah.com', callback, {retries: 5});

    expect(jsonp.mock.calls.length).toBe(6);
    expect(callback).lastCalledWith(null);
  });
});
