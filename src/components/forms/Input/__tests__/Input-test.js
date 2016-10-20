jest.disableAutomock()

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Input from '../'
var findByClass = TestUtils.findRenderedDOMComponentWithClass
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass
import { findRenderedDOMComponentWithAttribute as findByAttribute } from '../../../../test/helpers/scryRenderedDOMComponentsWithAttribute'

describe('Input', function () {
  it('renders an input', function () {
    var i18n = {
      name: 'test_input',
      label: 'Test Input',
      hint: 'This is a test',
      error: 'This input errored correctly'
    }
    var element = TestUtils.renderIntoDocument(<Input icon='bolt' i18n={i18n} width='half' />)
    var input = findByClass(element, 'Input__input')
    expect(input).toBeDefined()

    var inputWithName = findByAttribute(element, 'name', 'test_input')
    expect(inputWithName).toBeDefined()

    var label = findByClass(element, 'Input__label')
    expect(label.textContent).toContain('Test Input')

    var hint = findByClass(element, 'Input__message')
    expect(hint.textContent).toContain('This is a test')

    var icon = findByClass(element, 'fa-bolt')
    expect(icon).toBeDefined()

    element.setValid(false)

    var error = findByClass(element, 'Input__message')
    expect(error.textContent).toContain('This input errored correctly')

    var errorIcon = findByClass(element, 'fa-times')
    expect(errorIcon).toBeDefined()
  })

  it('will not alter input when readOnly', function () {
    var element = TestUtils.renderIntoDocument(<Input value='oldValue' readOnly />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.change(input, { target: { value: 'newValue' } })
    expect(input.value).toBe('oldValue')
  })

  it('will not execute methods when disabled', function () {
    var modal = jest.genMockFunction()
    var output = jest.genMockFunction()
    var mask = jest.genMockFunction()
    var validate = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input value='oldValue' disabled modal={modal} mask={mask} output={output} validate={validate} />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.change(input, { target: { value: 'newValue' } })
    TestUtils.Simulate.blur(input)
    expect(modal).not.toBeCalled()
    expect(output).not.toBeCalled()
    expect(mask).not.toBeCalled()
    expect(validate).not.toBeCalled()
    expect(input.value).toBe('oldValue')
  })

  it('will execute modal function on focus', function () {
    var modal = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input value='testValue' modal={modal} />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.focus(input)
    var object = {
      element: element,
      value: 'testValue',
      callback: element.setValue
    }
    expect(modal).lastCalledWith(object)
  })

  it('will execute output function on change', function () {
    var output = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input value='oldValue' output={output} />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.change(input, { target: { value: 'newValue' } })
    expect(output).lastCalledWith('newValue')
  })

  it('will execute mask function on change', function () {
    var mask = jest.genMockFunction().mockReturnValue('newValue--masked')
    var element = TestUtils.renderIntoDocument(<Input value='oldValue' mask={mask} />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.change(input, { target: { value: 'newValue' } })
    expect(mask).lastCalledWith('newValue')
    expect(input.value).toBe('newValue--masked')
  })

  it('will execute validate function, but not set state as invalid on blur if not required', function () {
    var validate = jest.genMockFunction()
    var setValid = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input required={false} validate={validate} />)
    element.setValid = setValid
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.blur(input)
    expect(setValid).not.toBeCalled()
    expect(validate).toBeCalled()
  })

  it('will execute validate function on blur if required', function () {
    var validate = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input required validate={validate} />)
    var input = findByClass(element, 'Input__input')
    TestUtils.Simulate.change(input, { target: { value: 'testValue' } })
    TestUtils.Simulate.blur(input)
    expect(validate).lastCalledWith('testValue', element.setValid)
    var setValidCallback = validate.mock.calls[0][1]
    setValidCallback(true)
    expect(element.state.valid).toBe(true)
    setValidCallback(false)
    expect(element.state.valid).toBe(false)
  })

  it('will execute validate function on load if has value', function () {
    var validate = jest.genMockFunction()
    var element = TestUtils.renderIntoDocument(<Input required value='testValue' validate={validate} />)
    expect(validate).lastCalledWith('testValue', element.setValid)
    var setValidCallback = validate.mock.calls[0][1]
    setValidCallback(true)
    expect(element.state.valid).toBe(true)
    setValidCallback(false)
    expect(element.state.valid).toBe(false)
  })

  it("animates label to large hint when 'animateLabel' is true", function () {
    var element = TestUtils.renderIntoDocument(<Input animateLabel />)
    findByClass(element, 'Input__label--empty-blur')
  })

  it("adds the 'Input--hasValue' class when it has a value", function () {
    var element = TestUtils.renderIntoDocument(<Input value='foo' />)
    findByClass(element, 'Input--hasValue')
  })

  it("does not add the 'Input--hasValue' class when it does not have a value", function () {
    var element = TestUtils.renderIntoDocument(<Input value='' />)
    var input = scryByClass(element, 'Input--hasValue')

    expect(input.length).toBeLessThan(1)
  })

  it("does not add the 'Input--hasValue' class when the value is set to null", function () {
    var element = TestUtils.renderIntoDocument(<Input value={null} />)
    var input = scryByClass(element, 'Input--hasValue')

    expect(input.length).toBeLessThan(1)
  })

  it('label is small if has value', function () {
    var element = TestUtils.renderIntoDocument(<Input animateLabel value='foo' />)
    var input = scryByClass(element, 'Input__label--empty-blur')

    expect(input.length).toBeLessThan(1)
  })

  it("adds the 'Input--hasIcon' class when an icon is rendered", function () {
    var element = TestUtils.renderIntoDocument(<Input showIcon disabled />)
    var element2 = TestUtils.renderIntoDocument(<Input showIcon icon='phone' />)
    findByClass(element, 'Input--hasIcon')
    findByClass(element2, 'Input--hasIcon')
  })

  it("does not add the 'Input--hasIcon' class when no icon is rendered", function () {
    var element = TestUtils.renderIntoDocument(<Input showIcon={false} disabled />)
    var element2 = TestUtils.renderIntoDocument(<Input showIcon={false} icon='phone' />)
    var element3 = TestUtils.renderIntoDocument(<Input showIcon />)

    var input = scryByClass(element, 'Input--hasIcon')
    var input2 = scryByClass(element2, 'Input--hasIcon')
    var input3 = scryByClass(element3, 'Input--hasIcon')

    expect(input.length).toBeLessThan(1)
    expect(input2.length).toBeLessThan(1)
    expect(input3.length).toBeLessThan(1)
  })
})
