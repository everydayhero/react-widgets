jest.disableAutomock()

import React from 'react'
import CallToActionButton from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass
var scryByTag = TestUtils.scryRenderedDOMComponentsWithTag

describe('CallToActionButton', function () {
  var component

  describe('cta', function () {
    var clicked = false

    beforeEach(function () {
      clicked = false
      var onClick = function () {
        clicked = true
      }

      component = TestUtils.renderIntoDocument(
        <CallToActionButton
          kind='cta'
          label='Get Started'
          icon='chevron-right'
          onClick={onClick}
          href='https://everydayhero.com/' />
      )
    })

    it('renders a CTA CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--cta')
    })

    it('handles click events', function () {
      var node = scryByTag(component, 'a')[0]
      TestUtils.Simulate.mouseUp(node)

      expect(clicked).toBe(true)
    })
  })

  describe('primary', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='primary' label='Get Started' icon='chevron-right' />
      )
    })

    it('renders a primary CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--primary')
    })
  })

  describe('secondary', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='secondary' label='Get Started' icon='chevron-right' />
      )
    })

    it('renders a secondary CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--secondary')
    })
  })

  describe('tertiary', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='tertiary' label='Get Started' icon='chevron-right' />
      )
    })

    it('renders a tertiary CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--tertiary')
    })
  })

  describe('href', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' icon='chevron-right' href='http://foo' />
      )
    })

    it('renders an anchor when given a href', function () {
      expect(scryByTag(component, 'a').length).toBe(1)
    })
  })

  describe('reverse', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' icon='chevron-right' reverse />
      )
    })

    it('reverses the CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--reverse')
    })
  })

  describe('thin', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' icon='chevron-right' thin />
      )
    })

    it('renders a thin CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--thin')
    })
  })

  describe('iconLeft', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' icon='chevron-right' iconLeft />
      )
    })

    it('renders the icon left', function () {
      findByClass(component, 'CallToActionButton--iconLeft')
    })
  })

  describe('disabled', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' icon='chevron-right' disabled />
      )
    })

    it('disables the CallToActionButton', function () {
      findByClass(component, 'CallToActionButton--disabled')
    })
  })

  describe('noBorder', function () {
    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <CallToActionButton kind='cta' label='Get Started' border={false} />
      )
    })

    it('has no border', function () {
      findByClass(component, 'CallToActionButton--noBorder')
    })
  })
})
