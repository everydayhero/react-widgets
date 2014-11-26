"use strict";
jest.autoMockOff();

var i18n = require('../i18n');

describe('i18n', function() {
  it('returns undefined for missing simple key', function() {
    expect(i18n.t({}, 'foo')).toBeUndefined();
  });

  it('returns undefined for fully missing complex key', function() {
    expect(i18n.t({}, 'foo.bar')).toBeUndefined();
  });

  it('returns undefined for partially missing complex key', function() {
    expect(i18n.t({foo: {}}, 'foo.bar')).toBeUndefined();
  });

  it('returns undefined for non object complex key', function() {
    expect(i18n.t({foo: 'blah'}, 'foo.bar')).toBeUndefined();
  });

  it('translates simple key', function() {
    expect(i18n.t({foo: 'blah'}, 'foo')).toBe('blah');
  });

  it('translates complex key', function() {
    expect(i18n.t({foo: {bar: 'blah'}}, 'foo.bar')).toBe('blah');
  });

  it('interpolates params', function() {
    expect(
      i18n.t({foo: 'Hello {name}'}, 'foo', {name: 'World!'})
    ).toBe('Hello World!');
  });

  it('accepts optional scope', function() {
    expect(
      i18n.t({foo: {bar: 'blah'}}, 'bar', {scope: 'foo'})
    ).toBe('blah');
  });

  it('ignores scope if key not found', function() {
    expect(
      i18n.t({bar: 'blah'}, 'bar', {scope: 'foo'})
    ).toBe('blah');
  });
});
