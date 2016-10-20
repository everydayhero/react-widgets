jest.disableAutomock()

import React from 'react'
import PromoCharitiesResult from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var result = {
  category: 'test tab 1',
  id: 'au-1',
  name: 'test charity 1',
  description: 'test description 1',
  url: 'http://test-url.com/1',
  logo_url: 'http://test-image-url.com/1',
  slug: 'test-slug-1',
  country_code: 'au'
}

describe('PromoCharitiesResult component default rendering', function () {
  it('renders a result with a button', function () {
    var promoCharitiesResult = <PromoCharitiesResult result={result} actionLabel='test label' />
    var component = TestUtils.renderIntoDocument(promoCharitiesResult)
    var element = findByClass(component, 'PromoCharitiesResult')
    var button = findByClass(component, 'PromoCharitiesResult__btn')

    expect(element).not.toBeNull()
    expect(button.textContent).toBe('test label')
  })
})

describe('Component behaviour when clicked or tapped', function () {
  var callback = jest.genMockFunction()
  var promoCharitiesResult = <PromoCharitiesResult result={result} onSelect={callback} />
  var component = TestUtils.renderIntoDocument(promoCharitiesResult)
  var link = findByClass(component, 'PromoCharitiesResult__link')
  var button = findByClass(component, 'PromoCharitiesResult__btn')

  it('calls onSelect on clicking the link', function () {
    TestUtils.Simulate.click(link)
    expect(callback).toBeCalledWith(result)
  })

  it('calls onSelect on clicking the button', function () {
    TestUtils.Simulate.click(button)
    expect(callback).toBeCalledWith(result)
  })
})

describe('Component optional values', function () {
  it('renders the charity title when showCharity is true', function () {
    var promoCharitiesResult = <PromoCharitiesResult result={result} showCharityTitle />
    var component = TestUtils.renderIntoDocument(promoCharitiesResult)
    var title = findByClass(component, 'PromoCharitiesResult__title')

    expect(title.textContent).toBe('test charity 1')
  })
})

