jest.disableAutomock()

import React from 'react'
import Icon from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('Icon', function () {
  it('renders an icon with default className', function () {
    var element = TestUtils.renderIntoDocument(
      <Icon icon='lock' />
    )
    var iconClasses = findByClass(element, 'Icon').classList
    expect(iconClasses.contains('fa-lock')).toBe(true)
  })

  it('renders an icon with fixedWidth className', function () {
    var element = TestUtils.renderIntoDocument(
      <Icon icon='lock' fixedWidth />
    )
    var iconClasses = findByClass(element, 'Icon').classList
    expect(iconClasses.contains('fa-fw')).toBe(true)
  })

  it('renders an icon with spin className', function () {
    var element = TestUtils.renderIntoDocument(
      <Icon icon='lock' spin />
    )
    var iconClasses = findByClass(element, 'Icon').classList
    expect(iconClasses.contains('fa-spin')).toBe(true)
  })
})
