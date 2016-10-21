jest.disableAutomock()

import React from 'react'
import ReactDOM from 'react-dom'
import LeaderboardPagingButton from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('LeaderboardPagingButton', function () {
  var leaderboardPagingButton
  var component
  var callback = jest.genMockFunction()

  var prevActiveClass = 'LeaderboardPagingButton__prev--active'
  var nextActiveClass = 'LeaderboardPagingButton__next--active'

  describe('paging defaults', function () {
    beforeEach(function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='next' action={callback} currentPage={1} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPagingButton)
    })

    it('renders a component', function () {
      expect(component).not.toBeNull()
    })

    it('triggers a callback when the button is clicked', function () {
      var pagingButton = findByClass(component, 'LeaderboardPagingButton__next')

      TestUtils.Simulate.click(pagingButton)
      expect(callback).toBeCalled()
    })
  })

  describe('next button', function () {
    it('displays a right pointing caret icon', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='next' action={callback} currentPage={1} pageCount={4} />
      component = TestUtils.renderIntoDocument(leaderboardPagingButton)

      var nextIcon = findByClass(component, 'fa-caret-right')
      expect(nextIcon).not.toBeNull()
    })

    it('has an active modifier class by default', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='next' action={callback} currentPage={1} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPagingButton)
      expect(ReactDOM.findDOMNode(component).classList.contains(nextActiveClass)).toBe(true)
    })

    it('has no active modifier class if the last page is displayed', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='next' action={callback} currentPage={4} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPagingButton)
      expect(ReactDOM.findDOMNode(component).classList.contains(nextActiveClass)).toBe(false)
    })
  })

  describe('previous button', function () {
    it('displays a left pointing caret icon', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='prev' action={callback} currentPage={4} pageCount={4} />
      component = TestUtils.renderIntoDocument(leaderboardPagingButton)

      var prevIcon = findByClass(component, 'fa-caret-left')
      expect(prevIcon).not.toBeNull()
    })

    it('has no active modifier class by default', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='prev' action={callback} currentPage={1} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPagingButton)
      expect(ReactDOM.findDOMNode(component).classList.contains(prevActiveClass)).toBe(false)
    })

    it('has an active modifier class if the last page is displayed', function () {
      leaderboardPagingButton = <LeaderboardPagingButton type='prev' action={callback} currentPage={4} pageCount={4} />

      component = TestUtils.renderIntoDocument(leaderboardPagingButton)
      expect(ReactDOM.findDOMNode(component).classList.contains(prevActiveClass)).toBe(true)
    })
  })
})
