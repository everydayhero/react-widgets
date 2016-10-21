jest.disableAutomock()

import React from 'react'
import Result from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('AggregateSearchResult', function () {
  var result = { id: '123', name: 'Enraged Potato' }

  it('renders result with content', function () {
    var searchResult = <Result result={result}>foo</Result>
    var component = TestUtils.renderIntoDocument(searchResult)
    var element = findByClass(component, 'AggregateSearchResult')

    expect(element.textContent).toBe('foo')
  })

  it('calls onSelect on click', function () {
    var callback = jest.genMockFunction()
    var searchResult = <Result result={result} onSelect={callback} />
    var component = TestUtils.renderIntoDocument(searchResult)
    var element = findByClass(component, 'AggregateSearchResult')

    TestUtils.Simulate.click(element)

    expect(callback).toBeCalledWith(result)
  })
})
