jest.disableAutomock()
jest.mock('../../../../api/totals')

import React from 'react'
import sinon from 'sinon'
import FundsRaised from '../'
import totals from '../../../../api/totals'
import TestUtils from 'react-addons-test-utils'

describe('FundsRaised', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass

  describe('component defaults', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      fundsRaised = <FundsRaised campaignUid='us-22' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })

    it('renders a default total', function () {
      element.setState({ isLoading: false })
      let total = findByClass(element, 'FundsRaised__total')
      expect(total.textContent).toContain('$0.00')
    })

    it('renders a default title', function () {
      element.setState({ isLoading: false })
      let title = findByClass(element, 'FundsRaised__title')

      expect(title.textContent).toBe('Raised To Date')
    })

    it('renders an icon by default', function () {
      let icon = findByClass(element, 'FundsRaised__icon')
      expect(icon).not.toBeNull()
    })

    it('renders a loading icon', function () {
      element.setState({ isLoading: true })
      findByClass(element, 'FundsRaised__loading')
    })
  })

  describe('single campaign id', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      fundsRaised = <FundsRaised campaignUid='us-22' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a single campaign id', function () {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1)
      expect(totals.findByCampaigns).toBeCalledWith({ campaignUids: 'us-22' }, element.onSuccess, {})
    })
  })

  describe('single page id', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByPages.mockClear()
      fundsRaised = <FundsRaised pageId='848751' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a single page id', function () {
      expect(totals.findByPages.mock.calls.length).toEqual(1)
      expect(totals.findByPages).toBeCalledWith('848751', element.onSuccess, {})
    })
  })

  describe('single charity id', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      fundsRaised = <FundsRaised charityUid='au-31' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a single charity id', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-31' }, element.onSuccess, {})
    })
  })

  describe('multiple charity ids', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      fundsRaised = <FundsRaised charityUids={['au-27', 'au-28']} />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles multiple charity ids', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: ['au-27', 'au-28'] }, element.onSuccess, {})
    })
  })

  describe('campaign and charity Ids', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByAll.mockClear()
      fundsRaised = <FundsRaised charityUids={['au-27', 'au-28']} campaignUids={['us-22']} />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles multiple charity and campaign Ids', function () {
      expect(totals.findByAll.mock.calls.length).toEqual(1)
      expect(totals.findByAll).toBeCalledWith({ charityUids: ['au-27', 'au-28'], campaignUids: ['us-22'] }, element.onSuccess, {})
    })
  })

  describe('working with multiple uids', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      fundsRaised = <FundsRaised campaignUids={['us-22', 'us-24']} />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a multiple campaign ids', function () {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1)
      expect(totals.findByCampaigns).toBeCalledWith({ campaignUids: ['us-22', 'us-24'] }, element.onSuccess, {})
    })
  })

  describe('using component props', function () {
    let fundsRaised
    let element
    let translation = {
      title: 'asdjasj',
      symbol: '£'
    }

    beforeEach(function () {
      fundsRaised = <FundsRaised i18n={translation} renderIcon={false} offset={100000} format={'0,0'} />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('renders a custom title', function () {
      element.setState({ isLoading: false })
      let title = findByClass(element, 'FundsRaised__title')

      expect(title.textContent).toBe(translation.title)
    })

    it('check for a default total', function () {
      element.setState({ isLoading: false })
      let total = findByClass(element, 'FundsRaised__total')

      expect(total.textContent).toContain('1,000')
    })

    it('check for a total with offset', function () {
      element.setState({ total: 100000, isLoading: false })
      let total = findByClass(element, 'FundsRaised__total')

      expect(total.textContent).toContain('2,000')
    })
  })

  describe('Number formatting options', function () {
    it('renders in a short format by default', function () {
      let fundsRaised = <FundsRaised campaignUid='au-0' />
      let element = TestUtils.renderIntoDocument(fundsRaised)

      element.setState({
        isLoading: false,
        total: 1000000
      })

      let total = findByClass(element, 'FundsRaised__total')
      expect(total.textContent).toBe('$10.00 k')
    })

    it('renders a different format if given acceptable numeral.js string', function () {
      let fundsRaised = <FundsRaised campaignUid='au-0' format='0[.]0' />
      let element = TestUtils.renderIntoDocument(fundsRaised)

      element.setState({
        isLoading: false,
        total: 1000000
      })

      let total = findByClass(element, 'FundsRaised__total')
      expect(total.textContent).toBe('$10000')
    })
  })

  describe('Displaying an icon', function () {
    it('renders no icon when renderIcon set to false', function () {
      let fundsRaised = <FundsRaised campaignUid='au-0' renderIcon={false} />
      let element = TestUtils.renderIntoDocument(fundsRaised)
      let icon = scryByClass(element, 'FundsRaised__icon')
      expect(icon.length).toEqual(0)
    })

    it('renders a custom icon when passed a valid FontAwesome string', function () {
      let fundsRaised = <FundsRaised campaignUid='au-0' renderIcon='paw' />
      let element = TestUtils.renderIntoDocument(fundsRaised)
      let icon = findByClass(element, 'fa-paw')
      expect(icon).not.toBeNull()
    })
  })

  describe('takes startAt property', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      fundsRaised = <FundsRaised charityUid='au-31' startAt='2015-01-01' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a startAt property', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-31' }, element.onSuccess, { start: '2015-01-01' })
    })
  })

  describe('takes endAt property', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      fundsRaised = <FundsRaised charityUid='au-31' endAt='2015-06-01' />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('handles a endAt property', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-31' }, element.onSuccess, { end: '2015-06-01' })
    })
  })

  describe('Group value filtering', function () {
    let fundsRaised
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      fundsRaised = <FundsRaised charityUid='au-31' groupValues={['ABC']} />
      element = TestUtils.renderIntoDocument(fundsRaised)
    })

    it('fetches data with a group value specified', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-31', groupValues: ['ABC'] }, element.onSuccess, {})
    })
  })

  describe('API Response Callback', function () {
    beforeEach(function () {
      jest.dontMock('../../../../api/totals')
      sinon.stub(totals, 'findByCharities', function (params, callback) {
        callback({
          total_amount_cents: {
            sum: 10000
          }
        })
      })
    })

    afterEach(function () {
      totals.findByCharities.restore()
    })

    it('fires the callback after API data is fetched', function () {
      let cb = jest.genMockFunction()
      TestUtils.renderIntoDocument(<FundsRaised charityUid='au-24' onLoad={function (res) { cb(res) }} />)
      expect(cb.mock.calls.length).toBe(1)
      expect(cb.mock.calls[0].length).toBe(1)
    })
  })
})
