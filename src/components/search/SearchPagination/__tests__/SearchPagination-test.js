jest.disableAutomock()

import React from 'react'
import SearchPagination from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('SearchPagination', function () {
  it('renders the page details', function () {
    var element = TestUtils.renderIntoDocument(
      <SearchPagination count={12} page={2} pageSize={10} totalPages={2} />
    )

    var details = findByClass(element, 'SearchPagination__counter')
    expect(details.textContent).toBe('11 - 12 of 12')
  })

  it('uses abbreviation for thousands of results', function () {
    var element = TestUtils.renderIntoDocument(
      <SearchPagination count={1234} page={2} pageSize={10} totalPages={123} />
    )

    var details = findByClass(element, 'SearchPagination__counter')
    expect(details.textContent).toBe('11 - 20 of 1K+')
  })

  it('uses abbreviation for millions of results', function () {
    var element = TestUtils.renderIntoDocument(
      <SearchPagination count={1234567} page={2} pageSize={10} totalPages={123456} />
    )

    var details = findByClass(element, 'SearchPagination__counter')
    expect(details.textContent).toBe('11 - 20 of 1M+')
  })
})
