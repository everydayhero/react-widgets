jest.disableAutomock()

import React from 'react'
import ShareButton from '../'
import ShareBox from '../../ShareBox'
import TestUtils from 'react-addons-test-utils'

describe('Share Button', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass
  let findRenderedComponent = TestUtils.findRenderedComponentWithType

  describe('component defaults', function () {
    let shareBtn
    let component

    beforeEach(function () {
      shareBtn = <ShareButton />
      component = TestUtils.renderIntoDocument(shareBtn)
    })

    it('renders something', function () {
      expect(component).not.toBeNull()
    })

    it('displays a sharing icon by default', function () {
      let icon = findByClass(component, 'ShareButton__icon')
      expect(icon).toBeDefined()
      expect(component.renderIcon()).toBeTruthy()
    })

    it('has default button label text', function () {
      let label = findByClass(component, 'ShareButton__label')
      expect(label).toBeDefined()
      expect(label.textContent).toBe('Share this page')
    })

    it('displays a ShareBox when state is open', function () {
      component.setState({ open: true })

      let result = component.renderShareBox()
      let shareBox = findRenderedComponent(component, ShareBox)

      expect(result).toBeTruthy()
      expect(shareBox).toBeDefined()
    })

    it('can toggle state to be open', function () {
      component.open()
      expect(component.state.open).toBe(true)
    })

    it('can toggle state to be close', function () {
      component.setState({ open: true })

      component.close()
      expect(component.state.open).toBe(false)
    })
  })

  describe('showing only specific buttons', function () {
    let shareBtn
    let component

    beforeEach(function () {
      shareBtn = <ShareButton buttons={['facebook', 'twitter']} />
      component = TestUtils.renderIntoDocument(shareBtn)
    })

    it('filters the list of services by the names of the button props', function () {
      let result = component.filterServices()
      expect(result.length).toBe(2)
      expect(result[0].name).toBe('facebook')
      expect(result[1].name).toBe('twitter')
    })
  })

  describe('icon display option', function () {
    let shareBtn
    let component

    beforeEach(function () {
      shareBtn = <ShareButton renderIcon={false} />
      component = TestUtils.renderIntoDocument(shareBtn)
    })

    it('has an option that stops the icon from displaying', function () {
      expect(component.renderIcon()).toBeFalsy()
    })
  })
})
