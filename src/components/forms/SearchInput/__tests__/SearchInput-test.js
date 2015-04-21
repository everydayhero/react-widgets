"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var SearchInput = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

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
    var input = scryByClass(element, 'rw-SearchInput');
  });

  it('returns a value on enter', function() {
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    React.addons.TestUtils.Simulate.keyUp(inputNode, {key: "Enter"});

    expect(submittedValue).toBe(initialValue);
  });

  it('returns a value on click search', function() {
    var button    = findByClass(element, 'hui-Button').getDOMNode();
    var inputNode = findByClass(element, 'Input__input').getDOMNode();

    React.addons.TestUtils.Simulate.change(inputNode, { target: { value: 'bar' } });
    React.addons.TestUtils.Simulate.mouseUp(button);

    expect(submittedValue).toBe('bar');
  });
});
