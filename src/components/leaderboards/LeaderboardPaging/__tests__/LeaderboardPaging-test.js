jest.disableAutomock()

import React from 'react'
import ReactDOM from 'react-dom'
import LeaderboardPaging from '../'
import TestUtils from 'react-addons-test-utils'

describe('LeaderboardPaging', function () {
  describe('component defaults', function () {
    let leaderboardPaging
    let component
    let callback = jest.fn(() => {})

    beforeEach(function () {
      leaderboardPaging = <LeaderboardPaging nextPage={callback} prevPage={callback} currentPage={1} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPaging)
    })

    it('renders a component', function () {
      expect(ReactDOM.findDOMNode(component).classList.contains('LeaderboardPaging')).toBe(true)
    })
  })
})
