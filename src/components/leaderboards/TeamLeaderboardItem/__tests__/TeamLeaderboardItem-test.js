jest.disableAutomock()

import React from 'react'
import TeamLeaderboardItem from '../'
import TestUtils from 'react-addons-test-utils'

describe('TeamLeaderboardItem', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass

  describe('component defaults', function () {
    let teamLeaderboardItem
    let element

    beforeEach(function () {
      teamLeaderboardItem = <TeamLeaderboardItem campaignUid='au-0' />
      element = TestUtils.renderIntoDocument(teamLeaderboardItem)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })

    it('renders a team image', function () {
      let elementImg = findByClass(element, 'TeamLeaderboard__items-image')
      expect(elementImg).not.toBeNull()
    })

    it('renders a team name', function () {
      let elementName = findByClass(element, 'TeamLeaderboard__items-name')
      expect(elementName).not.toBeNull()
    })
  })

  describe('Render charity name option', function () {
    let element
    let elementCharity

    it('renders a charity name if present', function () {
      let teamLeaderboardItem = <TeamLeaderboardItem charityName='foo' />
      element = TestUtils.renderIntoDocument(teamLeaderboardItem)
      elementCharity = findByClass(element, 'LeaderboardItem__charity')
      expect(elementCharity).not.toBeNull()
      expect(elementCharity.textContent).toEqual('foo')
    })
  })
})
