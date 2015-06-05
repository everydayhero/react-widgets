"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var SearchInput = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByProp  = require('../../../../test/helpers/scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;

describe('SearchInput', function() {

  var submittedValue = '';
  var initialValue = 'foo';
  var element;
  var onSubmit = function(value) {
    submittedValue = value;
  };

  beforeEach(function() {
    submittedValue = '';
    element = TestUtils.renderIntoDocument(<SearchInput onSubmit={ onSubmit } value={ initialValue } />);
  });

  it('renders an input', function() {
    var i18n = {
      name: 'test_input',
      label: 'Test Input'
    };

    var element = TestUtils.renderIntoDocument(<SearchInput onSubmit={ onSubmit } value={ initialValue } i18n={ i18n } />);
    var input = findByClass(element, 'Input__input');

    var inputWithName = findByProp(element, 'name', 'test_input');
    expect(inputWithName).toBeDefined();

    var label = findByClass(element, 'Input__label').getDOMNode();
    expect(label.textContent).toContain('Test Input');

    expect(input).toBeDefined();
  });

  it('contains initial value', function() {
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    expect(inputNode.value).toBe(initialValue);
  });

  it('returns a value on enter', function() {
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    TestUtils.Simulate.keyUp(inputNode, { key: "Enter" });

    expect(submittedValue).toBe(initialValue);
  });

  it('returns a value on click search', function() {
    var button    = findByClass(element, 'hui-Button').getDOMNode();
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    TestUtils.Simulate.change(inputNode, { target: { value: 'bar' } });
    TestUtils.Simulate.mouseUp(button);

    expect(submittedValue).toBe('bar');
  });

  it('clears the search input on submit', function() {
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    TestUtils.Simulate.change(inputNode, { target: { value: 'bar' } });
    TestUtils.Simulate.keyUp(inputNode, { key: "Enter" });

    expect(inputNode.value).toBe('');
  });
});
