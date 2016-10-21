jest.disableAutomock()
jest.mock('../../../../api/frolCharities')

jest.useFakeTimers()

import charities from '../../../../api/frolCharities'

const charity = {
  uid: 'xy-12',
  slug: 'foo',
  name: 'Foo',
  description: 'Fooy',
  country_code: 'xy',
  url: 'http://foo.com/'
}

const searchResponse = {
  charities: [charity],
  meta: {
    pagination: {
      count: 1,
      current_page: 1,
      total_pages: 2
    }
  }
}

charities.search.mockReturnValue(searchResponse)

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CharitySearchModal from '../'
import SearchModal from '../../SearchModal'
const findByClass = TestUtils.findRenderedDOMComponentWithClass
const findByType = TestUtils.findRenderedComponentWithType
const scryByClass = TestUtils.scryRenderedDOMComponentsWithClass
const findByTag = TestUtils.findRenderedDOMComponentWithTag

describe('CharitySearchModal', function () {
  beforeEach(function () {
    charities.search.mockClear()
  })

  it('renders a SearchModal', function () {
    let charitySearchModal = <CharitySearchModal autoFocus={false} />
    let element = TestUtils.renderIntoDocument(charitySearchModal)
    let searchModal = findByType(element, SearchModal)

    expect(searchModal).toBeDefined()
  })

  it('renders search results', function () {
    charities.search.mockImplementation(function (query, callback) { callback(searchResponse) })

    let charitySearchModal = <CharitySearchModal autoFocus={false} />
    let element = TestUtils.renderIntoDocument(charitySearchModal)
    let resultElements = scryByClass(element, 'SearchResult')

    expect(resultElements.length).toEqual(1)
    expect(resultElements[0].textContent).toContain(charity.name)
    expect(resultElements[0].textContent).toContain(charity.description)
  })

  it('searches for charities on input change', function () {
    let query = { searchTerm: 'foo', page: 1, pageSize: 10 }
    let charitySearchModal = <CharitySearchModal autoFocus={false} country='xy' />
    let element = TestUtils.renderIntoDocument(charitySearchModal)
    let input = findByTag(element, 'input')
    TestUtils.Simulate.change(input, { target: { value: 'foo' } })
    jest.runAllTimers()

    expect(charities.search.mock.calls.length).toEqual(2)
    expect(charities.search).lastCalledWith(query, element.updateResults)
  })

  it('searches for more charities on page change', function () {
    charities.search.mockImplementation(function (query, callback) { callback(searchResponse) })

    let query = { searchTerm: '', page: 2, pageSize: 10 }
    let charitySearchModal = <CharitySearchModal autoFocus={false} country='xy' />
    let element = TestUtils.renderIntoDocument(charitySearchModal)
    let nextPageButton = findByClass(element, 'SearchPagination__button--right')
    TestUtils.Simulate.click(nextPageButton)

    expect(charities.search.mock.calls.length).toEqual(2)
    expect(charities.search).lastCalledWith(query, element.updateResults)
  })

  it('updates isSearching accordingly', function () {
    let charitySearchModal = <CharitySearchModal autoFocus={false} country='xy' />
    let element = TestUtils.renderIntoDocument(charitySearchModal)

    expect(element.state.isSearching).toBeTruthy()

    let searchCallback = charities.search.mock.calls[0][1]
    searchCallback(searchResponse)

    expect(element.state.isSearching).toBeFalsy()

    let input = findByTag(element, 'input')
    TestUtils.Simulate.change(input, { target: { value: 'foo' } })
    jest.runAllTimers()

    expect(element.state.isSearching).toBeTruthy()
  })

  it('links to charity url for default visit action', function () {
    let onClose = jest.genMockFunction()
    let charitySearchModal = <CharitySearchModal autoFocus={false} onClose={onClose} />
    let element = TestUtils.renderIntoDocument(charitySearchModal)
    element.setState({ results: [charity] })

    let resultElements = scryByClass(element, 'SearchResult')

    expect(resultElements[0].href).toBe(charity.url)
  })
})
