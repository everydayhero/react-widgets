'use strict';
jest.autoMockOff();

var React = require('react');
var TestUtils       = require('react-addons-test-utils');
var findByClass     = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass     = TestUtils.scryRenderedDOMComponentsWithClass;
var findByAttribute = require('../../../../test/helpers/scryRenderedDOMComponentsWithAttribute').findRenderedDOMComponentWithAttribute;
var findByValue     = require('../../../../test/helpers/scryRenderedDOMComponentsWithValue').findRenderedDOMComponentWithValue;
var Amount          = require('../');

describe('Amount', function() {
  it('defaults to second preset amount', function() {
    var element = TestUtils.renderIntoDocument(<Amount amounts={[10,20,30,40]}/>);
    var selected = findByClass(element, 'AmountRadio--selected');
    expect(selected.textContent).toBe('20');

    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toBe('20');
  });

  it('allows you to set initial preset value', function() {
    var element = TestUtils.renderIntoDocument(<Amount amounts={[10,20,30,40]} amount={30}/>);
    expect(element.state.preset).toBe(30);
    expect(element.state.custom).toBe(null);

    var selected = findByClass(element, 'AmountRadio--selected');
    expect(selected.textContent).toBe('30');

    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toBe('30');
  });

  it('allows you to set initial custom value', function() {
    var element = TestUtils.renderIntoDocument(<Amount amounts={[10,20,30,40]} amount={123}/>);
    expect(element.state.preset).toBe(null);
    expect(element.state.custom).toBe(123);

    var selectedPresets = scryByClass(element, 'AmountRadio--selected');
    expect(selectedPresets.length).toBe(0);

    var selectedInput = findByAttribute(element, 'name', 'AmountInput-amount');
    expect(selectedInput.value).toBe('123');

    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toBe('123');
  });

  it('allows you to set label', function() {
    var element = TestUtils.renderIntoDocument(<Amount label="testLabel" />);
    var selected = findByClass(element, 'AmountRadio--selected');
    expect(selected).toBeDefined();

    var label = findByClass(element, 'Amount__label');
    expect(label.textContent).toContain('testLabel');
  });

  it('allows you to select a preset', function() {
    var element = TestUtils.renderIntoDocument(<Amount />);
    var select = findByValue(element, '1500');
    TestUtils.Simulate.click(select);
    expect(element.state.preset).toBe(1500);
    expect(element.state.custom).toBe(null);

    var selected = findByClass(element, 'AmountRadio--selected');
    expect(selected.textContent).toContain('1500');
    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toContain('1500');
  });

  it('allows you to enter a custom value', function() {
    var element = TestUtils.renderIntoDocument(<Amount />);
    var input = findByAttribute(element, 'type', 'text');
    TestUtils.Simulate.change(input, { target: { value: 123 }});
    expect(element.state.custom).toBe(123);
    expect(element.state.preset).toBe(null);

    var selected = findByClass(element, 'AmountInput--selected');
    expect(selected).toBeDefined();
    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toContain('123');
  });

  it('exposes selected value through callback', function() {
    var callback = jest.genMockFunction();
    var element = TestUtils.renderIntoDocument(<Amount output={ callback } />);
    expect(callback).lastCalledWith(700);

    var input = findByAttribute(element, 'type', 'text');
    TestUtils.Simulate.change(input, { target: { value: 123 }});
    expect(callback).lastCalledWith(123);

    var select = findByValue(element, '1500');
    TestUtils.Simulate.click(select);
    expect(callback).lastCalledWith(1500);
    var outputField = findByAttribute(element, 'name', 'amount');
    expect(outputField.value).toContain('1500');
  });
});
