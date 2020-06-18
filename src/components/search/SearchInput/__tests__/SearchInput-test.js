jest.disableAutomock()

jest.useFakeTimers('modern')

import React from 'react'
import SearchInput from '../'
import TestUtils from 'react-addons-test-utils'
const findByClass = TestUtils.findRenderedDOMComponentWithClass
const findByTag = TestUtils.findRenderedDOMComponentWithTag

describe('SearchInput', function () {
  it('allows custom className', function () {
    let component = <SearchInput className='foo' />
    let element = TestUtils.renderIntoDocument(component)

    findByClass(element, 'foo')
  })

  it('allows an optional placeholder', function () {
    let component = <SearchInput label='foo' />
    let element = TestUtils.renderIntoDocument(component)
    let input = findByClass(element, 'SearchInput__input')

    expect(input.getAttribute('placeholder')).toBe('foo')
  })

  it('allows an optional searchTerm', function () {
    let component = <SearchInput searchTerm='bar' />
    let element = TestUtils.renderIntoDocument(component)
    let input = findByClass(element, 'SearchInput__input')

    expect(input.value).toBe('bar')
  })

  it('show processing twirler when QueryInProgress', function () {
    let component = <SearchInput isSearching />
    let element = TestUtils.renderIntoDocument(component)

    findByClass(element, 'SearchInput__progressSpinner')
  })

  // TODO: Unskip this test when JSDom doesn't ignore autoFocus activeElement
  // again.
  // https://github.com/jsdom/jsdom/issues/2723 <- they think their behaviour
  // is correct, but it ain't.
  it.skip('auto focuses on autoFocus', function () {
    let component = <SearchInput autoFocus />
    let element = TestUtils.renderIntoDocument(component)
    let input = findByTag(element, 'input')

    expect(document.activeElement).toBe(input)

    // teardown: must unfocus elements or other tests fail
    input.blur()
  })

  it('calls onChange on change', function () {
    let callback = jest.fn(() => {})
    let component = <SearchInput onChange={callback} />
    let element = TestUtils.renderIntoDocument(component)
    let input = findByTag(element, 'input')
    TestUtils.Simulate.change(input, { target: { value: 'foo' } })

    expect(callback).not.toBeCalled()

    jest.runAllTimers()

    expect(callback).toBeCalledWith('foo')
  })

  it('debounces input changes', function () {
    let callback = jest.fn(() => {})
    let component = <SearchInput onChange={callback} />
    let element = TestUtils.renderIntoDocument(component)
    let input = findByTag(element, 'input')
    TestUtils.Simulate.change(input, { target: { value: 'foo' } })
    TestUtils.Simulate.change(input, { target: { value: 'bar' } })

    expect(callback).not.toBeCalled()

    jest.runAllTimers()

    expect(callback.mock.calls.length).toEqual(1)
    expect(callback).toBeCalledWith('bar')
  })
})
