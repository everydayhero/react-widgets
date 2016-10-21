jest.disableAutomock()
jest.mock('../../../../api/pages')

import React from 'react'
import TotalSupporters from '../'
import pages from '../../../../api/pages'
import TestUtils from 'react-addons-test-utils'

describe('TotalSupporters', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass

  describe('Component defaults', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters campaignUid='us-22' />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('render something', function () {
      expect(element).not.toBeNull()
    })

    it('renders default total of pages', function () {
      element.setState({ isLoading: false })
      let total = findByClass(element, 'TotalSupporters__total')

      expect(total.textContent).toContain('0')
    })

    it('renders a default title', function () {
      element.setState({ isLoading: false })
      let title = findByClass(element, 'TotalSupporters__title')

      expect(title.textContent).toBe('Supporters')
    })

    it('renders an icon by default', function () {
      let icon = findByClass(element, 'TotalSupporters__icon')

      expect(icon).not.toBeNull()
    })

    it('shows a loading icon', function () {
      element.setState({ isLoading: true })
      findByClass(element, 'TotalSupporters__loading')
    })

    it('makes a single call using to fetch api data', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: ['us-22'],
        charityUid: [],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('Working with multiple campaign uids', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters campaignUids={['us-22', 'us-24']} />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('makes a single call to fetch api data', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: ['us-22', 'us-24'],
        charityUid: [],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('single charity id', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters charityUid='au-24' />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('handles a single charity id', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ['au-24'],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('Working with multiple charity uids', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters charityUids={['au-24', 'au-31']} />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('makes a single call to fetch api data', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ['au-24', 'au-31'],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('Working with a single group value', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters charityUids={['au-24', 'au-31']} groupValue={'ABC'} />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('makes a single call to fetch data with a single group value', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ['au-24', 'au-31'],
        groupValue: ['ABC'],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('Working with a multiple group values', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters charityUids={['au-24', 'au-31']} groupValues={['ABC', 'DEF']} />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('makes a single call to fetch data with multiple group values', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ['au-24', 'au-31'],
        groupValue: ['ABC', 'DEF'],
        pageSize: 1,
        page: 1,
        searchTerm: ''
      }, element.onSuccess)
    })
  })

  describe('Custom component props', function () {
    let totalSupporters
    let element
    let translation = {
      title: 'blahblah'
    }

    beforeEach(function () {
      totalSupporters = <TotalSupporters i18n={translation} />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('renders a custom title', function () {
      element.setState({ isLoading: false })
      let title = findByClass(element, 'TotalSupporters__title')

      expect(title.textContent).toBe(translation.title)
    })

    it('renders a default total', function () {
      element.setState({ isLoading: false })
      let total = findByClass(element, 'TotalSupporters__total')

      expect(total.textContent).toContain('0')
    })
  })

  describe('Number formatting options', function () {
    it('renders in a standard format by default', function () {
      let totalSupporters = <TotalSupporters campaignUid='au-0' />
      let element = TestUtils.renderIntoDocument(totalSupporters)

      element.setState({
        isLoading: false,
        total: 10050
      })

      let total = findByClass(element, 'TotalSupporters__total')
      expect(total.textContent).toBe('10,050')
    })

    it('renders a different format if given acceptable numeral.js string', function () {
      let totalSupporters = <TotalSupporters campaignUid='au-0' format='0.00' />
      let element = TestUtils.renderIntoDocument(totalSupporters)

      element.setState({
        isLoading: false,
        total: 10050
      })

      let total = findByClass(element, 'TotalSupporters__total')
      expect(total.textContent).toBe('10050.00')
    })
  })

  describe('Displaying an icon', function () {
    it('renders no icon when renderIcon set to false', function () {
      let totalSupporters = <TotalSupporters campaignUid='au-0' renderIcon={false} />
      let element = TestUtils.renderIntoDocument(totalSupporters)
      let icon = scryByClass(element, 'TotalSupporters__icon')
      expect(icon.length).toEqual(0)
    })

    it('renders a custom icon when passed a valid FontAwesome string', function () {
      let totalSupporters = <TotalSupporters campaignUid='au-0' renderIcon='paw' />
      let element = TestUtils.renderIntoDocument(totalSupporters)
      let icon = findByClass(element, 'fa-paw')
      expect(icon).not.toBeNull()
    })
  })

  describe('Filtering by page type', function () {
    let totalSupporters
    let element

    beforeEach(function () {
      pages.search.mockClear()
      totalSupporters = <TotalSupporters charityUids={['au-24', 'au-31']} type='team' />
      element = TestUtils.renderIntoDocument(totalSupporters)
    })

    it('requests pages only of type "team"', function () {
      expect(pages.search.mock.calls.length).toEqual(1)
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ['au-24', 'au-31'],
        groupValue: [],
        pageSize: 1,
        page: 1,
        pageType: 'team',
        searchTerm: ''
      }, element.onSuccess)
    })
  })
})
