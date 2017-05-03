jest.disableAutomock()
jest.mock('../../../../api/totals')

import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import EntityGoalProgress from '../'
import totals from '../../../../api/totals'
import TestUtils from 'react-addons-test-utils'

describe('FundsRaised', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass

  let state = { isLoading: false, total: 15000, goal: 30000 }
  let element

  describe('Component defaults', function () {
    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid='us-22' />)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })

    it('renders GoalProgress text', function () {
      element.setState(state)
      let text = findByClass(element, 'GoalProgress__text')
      expect(text.textContent).toContain('$150 raised of $300 goal')
    })

    it('renders a GoalProgress bar', function () {
      element.setState(state)
      findByClass(element, 'GoalProgress__bar')
    })

    it('handles a single campaign id', function () {
      expect(totals.findByCampaigns).toBeCalledWith({ campaignUids: 'us-22' }, element.onSuccess, {})
    })
  })

  describe('Handle multiple campaign uids', function () {
    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid={['us-22', 'us-24', 'us-19']} />)
    })

    it('finds a total for multiple campaigns', function () {
      expect(totals.findByCampaigns).toBeCalledWith({ campaignUids: ['us-22', 'us-24', 'us-19'] }, element.onSuccess, {})
    })
  })

  describe('Handle multiple charity uids', function () {
    beforeEach(function () {
      totals.findByCharities.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress charityUid={['xx-11', 'xx-22', 'xx-33']} />)
    })

    it('finds a total for multiple charities', function () {
      expect(totals.findByCharities).toBeCalledWith({ charityUids: ['xx-11', 'xx-22', 'xx-33'] }, element.onSuccess, {})
    })
  })

  describe('Handle multiple uid types', function () {
    beforeEach(function () {
      totals.findByAll.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress charityUid='xx-11' campaignUid='us-22' />)
    })

    it('finds a total for a charity within a campaign', function () {
      expect(totals.findByAll).toBeCalledWith({ charityUids: 'xx-11', campaignUids: 'us-22' }, element.onSuccess, {})
    })
  })

  describe('Goal as property', function () {
    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid='us-22' goal={55500} />)
    })

    it('goal as property', function () {
      element.setState(state)
      let text = findByClass(element, 'GoalProgress__text')
      expect(text.textContent).toContain('$150 raised of $555 goal')
    })
  })

  describe('With no goal', function () {
    let state = { isLoading: false, total: 15000 }

    beforeEach(function () {
      totals.findByCampaigns.mockClear()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid='us-22' />)
    })

    it('Shows funds raised message', function () {
      element.setState(state)
      let text = findByClass(element, 'GoalProgress__text')
      expect(text.textContent).toContain('$150 raised')
    })
  })

  describe('takes startAt property', function () {
    let entityGoalProgress
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      entityGoalProgress = <EntityGoalProgress charityUid='au-31' startAt='2015-01-01' />
      element = TestUtils.renderIntoDocument(entityGoalProgress)
    })

    it('handles a startAt property', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-31' }, element.onSuccess, { start: '2015-01-01' })
    })
  })

  describe('takes endAt property', function () {
    let entityGoalProgress
    let element

    beforeEach(function () {
      totals.findByCharities.mockClear()
      entityGoalProgress = <EntityGoalProgress charityUid='au-24' endAt='2015-06-01' />
      element = TestUtils.renderIntoDocument(entityGoalProgress)
    })

    it('handles a endAt property', function () {
      expect(totals.findByCharities.mock.calls.length).toEqual(1)
      expect(totals.findByCharities).toBeCalledWith({ charityUids: 'au-24' }, element.onSuccess, { end: '2015-06-01' })
    })
  })

  describe('Currency symbol translation', function () {
    it('replaces the default currency symbol with a given string', function () {
      let translation = { symbol: 'foo' }
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid='us-22' i18n={translation} />)
      element.setState({ isLoading: false, total: 10000 })
      let text = findByClass(element, 'GoalProgress__text')
      expect(text.textContent).toContain('foo100')
    })
  })

  describe('Custom format property', function () {
    it('renders the custom format goal', function () {
      element = TestUtils.renderIntoDocument(<EntityGoalProgress goal={15000000} format={'0a'} />)
      element.setState({ isLoading: false, total: 100000 })
      let text = findByClass(element, 'GoalProgress__text')
      expect(text.textContent).toContain('$1k raised of $150k goal')
    })
  })

  describe('Custom offset value', function () {
    it('renders with the default offset of 0', function () {
      element = TestUtils.renderIntoDocument(<EntityGoalProgress goal={15000000} />)
      element.onSuccess({ isLoading: false, total_amount_cents: { sum: 100000 }, goal: 15000000 })
      let text = findByClass(element, 'GoalProgress__text')
      expect(ReactDOM.findDOMNode(text).textContent).toContain('$1,000 raised of $150,000 goal')
    })

    it('renders with a custom offset', function () {
      element = TestUtils.renderIntoDocument(<EntityGoalProgress goal={15000000} offset={200000} />)
      element.onSuccess({ isLoading: false, total_amount_cents: { sum: 300000 }, goal: 15000000 })
      let text = findByClass(element, 'GoalProgress__text')
      expect(ReactDOM.findDOMNode(text).textContent).toContain('$5,000 raised of $150,000 goal')
    })
  })

  describe('Callback function', function () {
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

    it('calls a callback function after data is fetched', function () {
      let cb = jest.genMockFunction()
      element = TestUtils.renderIntoDocument(<EntityGoalProgress charityUid='au-24' goal={15000000} onLoad={function (res) { cb(res) }} />)
      expect(cb.mock.calls.length).toBe(1)
    })
  })
})
