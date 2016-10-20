jest.disableAutomock()

import React from 'react'
import PageSearchResult from '../'
import TestUtils from 'react-addons-test-utils'
var findByClass = TestUtils.findRenderedDOMComponentWithClass
var findByTag = TestUtils.findRenderedDOMComponentWithTag

describe('it renders a result', function () {
  var result = {
    name: 'Foo',
    url: 'http://foo.com/',
    charity: {
      name: 'Bar'
    },
    campaign: {
      name: 'Baz'
    },
    image: {
      medium_image_url: 'blah.png'
    },
    supporter: {
      name: 'Supporter Name'
    }
  }

  it('renders page result', function () {
    var searchResult = <PageSearchResult result={result} />
    var component = TestUtils.renderIntoDocument(searchResult)
    var element = findByClass(component, 'SearchResult')
    var header = findByClass(component, 'PageSearchResult__header')
    var description = findByClass(component, 'PageSearchResult__description')
    var footer = findByClass(component, 'PageSearchResult__footer')
    var avatar = findByTag(component, 'img')
    var supporterName = findByClass(component, 'PageSearchResult__subheader')

    expect(element).toBeDefined()
    expect(element.href).toBe(result.url)
    expect(avatar.getAttribute('src')).toBe(result.image.medium_image_url)
    expect(header.textContent).toContain(result.name)
    expect(description.textContent).toBe(result.charity.name)
    expect(footer.textContent).toBe(result.campaign.name)
    expect(supporterName.textContent).toContain(result.supporter.name)
  })

  it('includes selectAction', function () {
    var searchResult = <PageSearchResult result={result} selectAction='Blah' />
    var component = TestUtils.renderIntoDocument(searchResult)
    var action = findByClass(component, 'PageSearchResult__actions')

    expect(action.textContent).toBe('Blah')
  })
})
