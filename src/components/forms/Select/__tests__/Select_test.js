jest.disableAutomock()

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Select from '../'
var findByClass = TestUtils.findRenderedDOMComponentWithClass
import { findRenderedDOMComponentWithAttribute as findByAttribute } from '../../../../test/helpers/scryRenderedDOMComponentsWithAttribute'

var i18n = {
  name: 'test_Select',
  label: 'Test Select'
}
var options = [
  { name: 'option1' },
  { name: 'option2' },
  { name: 'option3' },
  { name: 'option4' }
]

describe('Select', function () {
  it('renders a Select', function () {
    var element = TestUtils.renderIntoDocument(<Select i18n={i18n} value={'option1'} options={options} />)
    var select = findByClass(element, 'Select')
    expect(select).toBeDefined()

    var selectWithName = findByAttribute(element, 'name', 'test_Select')
    expect(selectWithName).toBeDefined()

    var selectInput = findByClass(element, 'Input__input')
    expect(selectInput.value).toBe('option1')

    var label = findByClass(element, 'Input__label')
    expect(label.textContent).toContain('Test Select')

    var icon = findByClass(element, 'fa-caret-down')
    expect(icon).toBeDefined()

    TestUtils.Simulate.focus(selectInput)
    var optionList = findByClass(element, 'SelectOptions')
    expect(optionList).toBeDefined()
  })

  it('will not execute methods when disabled', function () {
    var output = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Select value='oldValue' disabled output={output} options={options} />)
    var selectInput = findByClass(element, 'Input__input')
    TestUtils.Simulate.focus(selectInput)
    TestUtils.Simulate.change(selectInput, { target: { value: 'newValue' }})
    TestUtils.Simulate.blur(selectInput)
    expect(output).not.toBeCalled()
    expect(selectInput.value).toBe('oldValue')
  })

  it('will execute output function on option selected', function () {
    var output = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Select options={options} output={output} />)
    var selectInput = findByClass(element, 'Input__input')
    TestUtils.Simulate.change(selectInput, { target: { value: 'option3' }})
    var option3 = findByClass(element, 'SelectOption--focused')
    TestUtils.Simulate.click(option3)
    expect(output).lastCalledWith('option3', { name: 'option3' })

    TestUtils.Simulate.change(selectInput, { target: { value: '2' }})
    var option2 = findByClass(element, 'SelectOption--focused')
    TestUtils.Simulate.click(option2)
    expect(output).lastCalledWith('option2', { name: 'option2' })
  })
})
