jest.disableAutomock()
jest.mock('../../../../api/campaigns')

import React from 'react'
import CallToActionBox from '../'
import campaigns from '../../../../api/campaigns'
import TestUtils from 'react-addons-test-utils'

describe('CallToActionBox', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass

  describe('component defaults', function () {
    let callToActionBox
    let element

    beforeEach(function () {
      callToActionBox = <CallToActionBox campaignUid='au-0' registrationUrl='http://google.com.au/' />
      element = TestUtils.renderIntoDocument(callToActionBox)
    })

    it('renders something', function () {
      expect(element).not.toBeNull()
    })

    it('renders a loading icon', function () {
      element.setState({ isLoading: true })
      findByClass(element, 'CallToActionBox__loading')
    })

    it('renders a default title', function () {
      element.setState({ isLoading: false })
      let heading = findByClass(element, 'CallToActionBox__title')

      expect(heading.textContent).toBe('Get Involved')
    })

    it('renders default sign in link text', function () {
      element.setState({ isLoading: false })
      let link = findByClass(element, 'CallToActionBox__link')

      expect(link.textContent).toBe('Sign in')
    })

    it('renders if handed default campaign id', function () {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess)
    })
  })

  describe('component props', function () {
    let callToActionBox
    let element
    let translation = {
      title: 'Get on with it',
      signInLabel: 'login'
    }

    beforeEach(function () {
      callToActionBox = <CallToActionBox i18n={translation} />
      element = TestUtils.renderIntoDocument(callToActionBox)
    })

    it('renders a custom heading', function () {
      element.setState({ isLoading: false })
      let title = findByClass(element, 'CallToActionBox__title')

      expect(title.textContent).toBe(translation.title)
    })

    it('renders a custom heading', function () {
      element.setState({ isLoading: false })
      let signInLabel = findByClass(element, 'CallToActionBox__link')

      expect(signInLabel.textContent).toBe(translation.signInLabel)
    })
  })
})
