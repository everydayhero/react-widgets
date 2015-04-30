"use strict";
jest.autoMockOff();

var format = require('../format');

describe('format', function() {
  it('interpolates params', function() {
    expect(format('Hello {name}!', {name: 'World'})).toBe('Hello World!');
  });

  it('strips placeholders when requested', function() {
    expect(format('Hello {name}!', null, true)).toBe('Hello !');
  });

  it('does not strip placeholders when not requested', function() {
    expect(format('Hello {name}!')).toBe('Hello {name}!');
  });

  it('supports numeral placeholder formatting', function() {
    expect(format('{count:0,0}', {count: 1234567890})).toBe('1,234,567,890');
  });
});
