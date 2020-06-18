jest.disableAutomock()

jest.mock('jsonp')
import jsonp from 'jsonp'
jsonp.mockImplementation(function (url, options, callback) { callback('error', null) })

import getJSONP from '../getJSONP'

describe('getJSONP', function () {
  beforeEach(function () {
    jsonp.mockClear()
  })

  it('retries a default of 2 times', function () {
    var callback = jest.fn(() => {})
    getJSONP('http://blah.com', callback)
    expect(jsonp.mock.calls.length).toBe(3)
    expect(callback).lastCalledWith(null)
  })

  it('accepts number of retries', function () {
    var callback = jest.fn(() => {})
    getJSONP('http://blah.com', callback, { retries: 5 })

    expect(jsonp.mock.calls.length).toBe(6)
    expect(callback).lastCalledWith(null)
  })
})
