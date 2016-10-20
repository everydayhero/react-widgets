jest.disableAutomock()

import React from 'react'
import TestUtils from 'react-addons-test-utils'
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass
var findByClass = TestUtils.findRenderedDOMComponentWithClass
import Overlay from '../'

describe('Overlay', function () {
  it('renders something', function () {
    var overlay = <Overlay />
    var element = TestUtils.renderIntoDocument(overlay)
    expect(element).toBeTruthy()
  })

  it('calls the onClose prop when clicking the close button', function () {
    var spy = jasmine.createSpy()
    var overlay = <Overlay onClose={spy} />
    var element = TestUtils.renderIntoDocument(overlay)
    var closeButton = findByClass(element, 'Overlay__close')
    TestUtils.Simulate.click(closeButton)
    expect(spy).toHaveBeenCalled()
  })

  it('renders close button with onClose', function () {
    var spy = jasmine.createSpy()
    var overlay = <Overlay onClose={spy} />
    var element = TestUtils.renderIntoDocument(overlay)
    var closeButton = findByClass(element, 'Overlay__close')
    expect(closeButton).toBeDefined()
  })

  it('hides close button without onClose', function () {
    var overlay = <Overlay />
    var element = TestUtils.renderIntoDocument(overlay)
    var closeButton = scryByClass(element, 'Overlay__close')[0]
    expect(closeButton).toBeUndefined()
  })

  it('hides close button when showCloseButton is false', function () {
    var spy = jasmine.createSpy()
    var overlay = <Overlay onClose={spy} showCloseButton={false} />
    var element = TestUtils.renderIntoDocument(overlay)
    var closeButton = scryByClass(element, 'Overlay__close')[0]
    expect(closeButton).toBeUndefined()
  })
})
