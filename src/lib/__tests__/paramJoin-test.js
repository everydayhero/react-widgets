"use strict";
jest.autoMockOff();

var paramJoin = require('../paramJoin');

describe('paramJoin', function() {
  it('converts a single array element to a string', function() {
    var str = paramJoin(['ABC'], '&value=');
    expect(str).toBe('ABC');
  });

  it('joins multiple strings into a single string as consecutive url parameters', function() {
    var str = paramJoin(['ABC', 'DEF', 'GHI'], '&value=');
    expect(str).toBe('ABC&value=DEF&value=GHI');
  });
});
