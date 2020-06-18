jest.disableAutomock()

import React from 'react'
import Tab from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('Tab', function () {
  var tab
  var component
  var element
  var callback = jest.fn(() => {})

  beforeEach(function () {
    tab = <Tab onClick={callback} onKeyDown={callback} label={'foobar'} index={1} active />
    component = TestUtils.renderIntoDocument(tab)
    element = findByClass(component, 'Tab')
  })

  it('renders a tab with a name', function () {
    expect(element.textContent).toBe('foobar')
    expect(element.className).toContain('active')
  })

  it('calls an on click with an index', function () {
    TestUtils.Simulate.click(element)
    expect(callback).toBeCalledWith(1)
  })

  it('calls an on keydown function with an index', function () {
    TestUtils.Simulate.keyDown(element, { keyCode: 13 })
    expect(callback).toBeCalledWith(1)
  })
})
