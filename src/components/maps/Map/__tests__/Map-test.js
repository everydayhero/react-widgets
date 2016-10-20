jest.disableAutomock()
jest.mock('../../../../api/pages')

import React from 'react'
import Map from '../'
import TestUtils from 'react-addons-test-utils'

describe('Map', function () {
  describe('component defaults', function () {
    let map
    let element

    beforeEach(function () {
      map = <Map campaignUid='au-0' />
      element = TestUtils.renderIntoDocument(map)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })
  })
})
