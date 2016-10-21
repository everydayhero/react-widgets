jest.disableAutomock()

import React from 'react'
import FlagIcon from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('FlagIcon', function () {
  it('renders a flag icon', function () {
    var element = TestUtils.renderIntoDocument(<FlagIcon country='au' />)
    var iconClasses = findByClass(element, 'flag').classList
    expect(iconClasses.contains('au')).toBe(true)
  })
})
