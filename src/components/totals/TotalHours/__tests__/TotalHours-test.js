jest.disableAutomock()
jest.mock('../../../../api/campaigns')

import React from 'react'
import TotalHours from '../'
import campaigns from '../../../../api/campaigns'
import TestUtils from 'react-addons-test-utils'

describe('TotalDistance', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass

  describe('Component when handed multiple uids', function () {
    let totalHours
    let element

    beforeEach(function () {
      campaigns.findByUids.mockClear()
      totalHours = <TotalHours campaignUids={['us-22', 'us-24']} />
      element = TestUtils.renderIntoDocument(totalHours)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })

    it('renders an icon by default', function () {
      let icon = findByClass(element, 'TotalHours__icon')
      expect(icon).not.toBeNull()
    })

    it('renders a loading icon', function () {
      element.setState({ isLoading: true })
      findByClass(element, 'TotalHours__loading')
    })

    it('loads data for multiple campaigns', function () {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1)
      expect(campaigns.findByUids).toBeCalledWith(['us-22', 'us-24'], element.onSuccess)
    })
  })

  describe('Component when handed one uid', function () {
    let totalHours
    let element

    beforeEach(function () {
      campaigns.findByUids.mockClear()
      totalHours = <TotalHours campaignUid='us-22' />
      element = TestUtils.renderIntoDocument(totalHours)
    })

    it('handles loads data for a single campaign', function () {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1)
      expect(campaigns.findByUids).toBeCalledWith(['us-22'], element.onSuccess)
    })
  })

  describe('Custom component props', function () {
    let totalHours
    let element
    let translation = {
      title: 'Kilometers'
    }

    beforeEach(function () {
      totalHours = <TotalHours i18n={translation} renderIcon={false} />
      element = TestUtils.renderIntoDocument(totalHours)
    })

    it('renders a custom title', function () {
      element.setState({
        isLoading: false,
        total: 123
      })
      let title = findByClass(element, 'TotalHours__title')

      expect(title.textContent).toBe(translation.title)
    })
  })

  describe('Number formatting options', function () {
    it('renders in a human readable format by default', function () {
      let totalHours = <TotalHours campaignUid='au-0' />
      let element = TestUtils.renderIntoDocument(totalHours)

      element.setState({
        isLoading: false,
        hasResults: true,
        total: 37800
      })

      let total = findByClass(element, 'TotalHours__total')
      expect(total.textContent).toBe('10.5')
    })

    it('renders a different format if given acceptable numeral.js string', function () {
      let totalHours = <TotalHours campaignUid='au-0' format='0,0[.]00' />
      let element = TestUtils.renderIntoDocument(totalHours)

      element.setState({
        isLoading: false,
        hasResults: true,
        total: 37800
      })

      let total = findByClass(element, 'TotalHours__total')
      expect(total.textContent).toBe('10.50')
    })
  })

  describe('Displaying an icon', function () {
    it('renders no icon when renderIcon set to false', function () {
      let totalHours = <TotalHours campaignUid='au-0' renderIcon={false} />
      let element = TestUtils.renderIntoDocument(totalHours)
      let icon = scryByClass(element, 'Goal__icon')
      expect(icon.length).toEqual(0)
    })

    it('renders a custom icon when passed a valid FontAwesome string', function () {
      let totalHours = <TotalHours campaignUid='au-0' renderIcon='paw' />
      let element = TestUtils.renderIntoDocument(totalHours)
      let icon = findByClass(element, 'fa-paw')
      expect(icon).not.toBeNull()
    })
  })
})
