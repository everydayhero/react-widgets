jest.disableAutomock()
jest.mock('../../../../api/campaigns')

import React from 'react'
import FitnessLeaderboard from '../'
import TestUtils from 'react-addons-test-utils'

describe('FitnessLeaderboard', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass

  describe('Component defaults', function () {
    let leaderboard
    let component

    beforeEach(function () {
      leaderboard = <FitnessLeaderboard campaignUid='au-0' />
      component = TestUtils.renderIntoDocument(leaderboard)
    })

    it('renders something', function () {
      expect(component).not.toBeNull()
    })

    it('renders a default heading', function () {
      let heading = findByClass(component, 'FitnessLeaderboard__heading')
      expect(heading.textContent).toBe('Top Individuals')
    })

    it('renders a loading icon', function () {
      component.setState({ isLoading: true })
      let element = findByClass(component, 'FitnessLeaderboard__loading')
      expect(element).toBeDefined()
    })
  })

  describe('Custom component props', function () {
    let leaderboard
    let component
    let translation = {
      heading: 'Top Teams'
    }

    beforeEach(function () {
      leaderboard = <FitnessLeaderboard campaignUid='au-0' i18n={translation} type='team' />
      component = TestUtils.renderIntoDocument(leaderboard)
    })

    it('renders a custom heading', function () {
      let heading = findByClass(component, 'FitnessLeaderboard__heading')
      expect(heading.textContent).toBe(translation.heading)
    })
  })

  describe('Currency formatting options', function () {
    it('renders in a short format by default', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      expect(component.formatAmount(10000)).toEqual('$100 ')
    })

    it('renders a different format if given acceptable numeral.js string', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' currencyFormat='0.00' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      expect(component.formatAmount(10000)).toEqual('$100.00')
    })
  })

  describe('Distance formatting options', function () {
    it('has and renders a default format', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      expect(component.formatDistance(4410500)).toEqual('2,740.56 mi')
    })

    it('renders a different format if given acceptable numeral.js string', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' distanceFormat='0,0' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      expect(component.formatDistance(4410500)).toEqual('2,741 mi')
    })

    it('formats kilometers if handed a unit prop', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' unit='km' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      expect(component.formatDistance(4410500)).toEqual('4,410.50 km')
    })
  })

  describe('Leaderboard sorting functionality', function () {
    let mockBoardData = [
      { id: 1, amount: 1000, distance: 500 },
      { id: 2, amount: 2000, distance: 100 },
      { id: 3, amount: 3000, distance: 300 }
    ]

    it('Sorts leaderboard by distance by default', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      component.setState({ boardData: mockBoardData })
      component.sortLeaderboard(component.props.initialSort)

      expect(component.state.boardData[0].id).toBe(1)
      expect(component.state.boardData[1].id).toBe(3)
      expect(component.state.boardData[2].id).toBe(2)
    })

    it('Sorts leaderboard by amount when handed an initialSort prop', function () {
      let leaderboard = <FitnessLeaderboard campaignUid='au-0' initialSort='amount' />
      let component = TestUtils.renderIntoDocument(leaderboard)

      component.setState({ boardData: mockBoardData })
      component.sortLeaderboard(component.props.initialSort)

      expect(component.state.boardData[0].id).toBe(3)
      expect(component.state.boardData[1].id).toBe(2)
      expect(component.state.boardData[2].id).toBe(1)
    })
  })
})
