"use strict";
jest.autoMockOff();

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { };
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var routes = require('../routes');
var leaderboard = require('../leaderboard');

describe('leaderboard', function() {
  it('find', function() {
    var callback = jest.genMockFunction();
    leaderboard.find('xy-123', 'foo', 12, callback);

    expect(getJSONP).lastCalledWith(
      'https://everydayhero.com/api/v2/campaigns/xy-123/leaderboard.jsonp?type=foo&limit=12',
      callback
    );
    expect(callback).toBeCalledWith(results);
  });
});
