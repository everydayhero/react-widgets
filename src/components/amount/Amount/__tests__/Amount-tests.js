"use strict";
jest.autoMockOff();

var React = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var Amount = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByProp = require('../../../../test/helpers/scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;


describe('Amount', function() {
  it('loads with a selected default', function() {
    var element = TestUtils.renderIntoDocument(<Amount label="testLabel" />);
    var selected = findByClass(element, 'AmountRadio--selected');
    expect(selected).toBeDefined();

    var label = findByClass(element, 'Amount__label').getDOMNode();
    expect(label.textContent).toContain('testLabel');
  });

  it('allows you to select a preset', function() {
    var element = TestUtils.renderIntoDocument(<Amount />);
    var select = findByProp(element, 'id', 1500);
    TestUtils.Simulate.click(select);
    expect(element.state.preset).toBe(1500);
    expect(element.state.custom).toBe(null);

    var selected = findByClass(element, 'AmountRadio--selected').getDOMNode();
    expect(selected.textContent).toContain('1500');
  });

  it('allows you to enter a custom value', function() {
    var element = TestUtils.renderIntoDocument(<Amount />);
    var input = findByProp(element, 'type', 'text').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: 123 } });
    expect(element.state.custom).toBe(123);
    expect(element.state.preset).toBe(null);

    var selected = findByClass(element, 'AmountInput--selected');
    expect(selected).toBeDefined();
  });

  it('exposes selected value through callback', function() {
    var callback = jest.genMockFunction();
    var element = TestUtils.renderIntoDocument(<Amount output={ callback } />);
    expect(callback).lastCalledWith(700);

    var input = findByProp(element, 'type', 'text').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: 123 } });
    expect(callback).lastCalledWith(123);

    var select = findByProp(element, 'id', 1500);
    TestUtils.Simulate.click(select);
    expect(callback).lastCalledWith(1500);
  });
});
