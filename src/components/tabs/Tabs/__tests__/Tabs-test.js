jest.disableAutomock()

import React from 'react'
import Tabs from '../'
import TestUtils from 'react-addons-test-utils'

describe('Tabs', function () {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass

  let data = [
    {
      'label': 'foo',
      'content': 'blah'
    },
    {
      'label': 'bar',
      'content': '<p>Dummy html <strong>content</strong>.</p>'
    }
  ]

  describe('Tabs', function () {
    let tabs
    let component

    beforeEach(function () {
      tabs = <Tabs children={data} collapse={'auto'} />
      component = TestUtils.renderIntoDocument(tabs)
    })

    it('renders all the tabs', function () {
      let tabsContainer = findByClass(component, 'Tabs')
      let tabsElements = scryByClass(component, 'Tab')

      expect(tabsContainer).toBeDefined()
      expect(tabsElements.length).toBe(data.length)
      expect(tabsElements[0].textContent).toBe('foo')
      expect(tabsElements[1].textContent).toBe('bar')
    })

    it('renders a tab list', function () {
      let tabList = findByClass(component, 'Tabs__tab-list')
      expect(tabList.getAttribute('role')).toBe('tablist')
    })

    it('renders tab content areas', function () {
      let contents = scryByClass(component, 'Tabs__content')
      expect(contents.length).toBe(data.length)
      expect(contents[0].textContent).toContain('blah')
      expect(contents[1].textContent).toContain('Dummy html content.')
    })

    it('defaults to displaying the first tab', function () {
      expect(component.state.current).toBe(0)
    })

    it('can switch tabs', function () {
      component.switchTab(1)
      expect(component.state.current).toBe(1)
    })

    it('renders tabdrawers if the window size is smaller when set to stacked', function () {
      component.setState({ stacked: true })
      let tabDrawers = scryByClass(component, 'TabDrawer')
      expect(tabDrawers.length).toBe(data.length)
    })

    it('can switch tabs using right key', function () {
      let firstTab = scryByClass(component, 'Tab')[0]
      TestUtils.Simulate.keyDown(firstTab, { keyCode: 39 })
      expect(component.state.current).toBe(1)
    })

    it('can switch tabs using left key', function () {
      let firstTab = scryByClass(component, 'Tab')[1]
      TestUtils.Simulate.keyDown(firstTab, { keyCode: 37 })
      expect(component.state.current).toBe(0)
    })

    it('auto collapses when collapse property = "auto"', function () {
      tabs = <Tabs children={data} collapse={'auto'} />
      component = TestUtils.renderIntoDocument(tabs)

      let tabsElement = findByClass(component, 'Tabs')
      expect(tabsElement.className).toBe('Tabs Tabs--tiny')
    })

    it('does not collapse when collapse property = false', function () {
      tabs = <Tabs children={data} collapse={false} />
      component = TestUtils.renderIntoDocument(tabs)

      let tabsElement = findByClass(component, 'Tabs')
      expect(tabsElement.className).toBe('Tabs')
    })

    it('collapses when collapse property = true', function () {
      tabs = <Tabs children={data} collapse />
      component = TestUtils.renderIntoDocument(tabs)

      let tabsElement = findByClass(component, 'Tabs')
      expect(tabsElement.className).toBe('Tabs Tabs--collapsed')
    })
  })
})
