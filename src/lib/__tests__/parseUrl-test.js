jest.disableAutomock()

import parseUrl from '../parseUrl'

describe('parseUrl', function () {
  it('parses simple urls', function () {
    var parts = parseUrl('http://foo.com')
    expect(parts.protocol).toBe('http')
    expect(parts.hostname).toBe('foo.com')
    expect(parts.path).toBe('/')
  })

  it('parses urls with port number', function () {
    var parts = parseUrl('http://foo.com:1234')
    expect(parts.hostname).toBe('foo.com:1234')
  })

  it('parses urls with path', function () {
    var parts = parseUrl('http://foo.com/bar')
    expect(parts.path).toBe('/bar')
  })

  it('parses urls with query', function () {
    var parts = parseUrl('http://foo.com?a=b&c=d')
    expect(parts.query).toBe('a=b&c=d')
  })

  it('parses urls with bookmark', function () {
    var parts = parseUrl('http://foo.com#bar')
    expect(parts.bookmark).toBe('bar')
  })

  it('parses complex urls', function () {
    var parts = parseUrl('https://subdomain.foo-bar.com.au:1234/sub/path?a=b&c=d#blah')
    expect(parts.protocol).toBe('https')
    expect(parts.hostname).toBe('subdomain.foo-bar.com.au:1234')
    expect(parts.path).toBe('/sub/path')
    expect(parts.query).toBe('a=b&c=d')
    expect(parts.bookmark).toBe('blah')
  })
})
