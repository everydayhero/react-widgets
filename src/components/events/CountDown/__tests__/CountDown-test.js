jest.disableAutomock()

import React from 'react'
import moment from 'moment'
import CountDown from '../'
import TestUtils from 'react-addons-test-utils'

describe('CountDown', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass

  describe('component defaults', function () {
    let component
    let date = '2016-04-24'

    beforeEach(function () {
      let countDown = <CountDown date={date} />
      component = TestUtils.renderIntoDocument(countDown)
    })

    it('renders something', function () {
      expect(component).not.toBeNull()
    })

    it('renders days', function () {
      let element = findByClass(component, 'CountDown__days')
      expect(element).toBeDefined()
    })
  })

  describe('component configurable', function () {
    let component
    let date = moment().add(10, 'days').format('YYYY-MM-DD')
    let linkUrl = 'http://www.google.com/'

    beforeEach(function () {
      let countDown = <CountDown date={date} i18n={{ link_text: 'get foobarred' }} linkUrl={linkUrl} />
      component = TestUtils.renderIntoDocument(countDown)
    })

    it('renders anchor with provided text', function () {
      let link = findByClass(component, 'CountDown__link')
      expect(link.textContent).toBe('get foobarred')
    })
  })

  describe('when the event date is in the future', function () {
    let countDown
    let component
    let linkUrl = 'http://everydayhero.com/'
    let date = moment().add(10, 'days').format('YYYY-MM-DD')

    beforeEach(function () {
      countDown = <CountDown date={date} linkUrl={linkUrl} />
      component = TestUtils.renderIntoDocument(countDown)
    })

    it('renders days', function () {
      let element = findByClass(component, 'CountDown__days')
      expect(element.textContent).toBe('10')
    })

    it('renders a string using past tense', function () {
      let label = findByClass(component, 'CountDown__label')
      expect(label.textContent).toBe('days to go')
    })

    it('renders an anchor with a link url', function () {
      let link = findByClass(component, 'CountDown__link')
      expect(link.href).toBe(linkUrl)
    })
  })

  describe('when the event date is in the past', function () {
    let countDown
    let component
    let linkUrl = 'http://everydayhero.com/'
    let date = moment().subtract(10, 'days').format('YYYY-MM-DD')

    beforeEach(function () {
      countDown = <CountDown date={date} linkUrl={linkUrl} />
      component = TestUtils.renderIntoDocument(countDown)
    })

    it('renders days', function () {
      let element = findByClass(component, 'CountDown__days')
      expect(element.textContent).toBe('10')
    })

    it('renders a string using past tense', function () {
      let label = findByClass(component, 'CountDown__label')
      expect(label.textContent).toBe('days ago')
    })

    it('renders text telling the user the event is finished', function () {
      let element = findByClass(component, 'CountDown__finished')
      expect(element.textContent).toBe('This event has now finished.')
    })
  })
})
