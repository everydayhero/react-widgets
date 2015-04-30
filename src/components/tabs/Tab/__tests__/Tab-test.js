"use strict";

jest.autoMockOff();

var React       = require('react/addons');
var Tab         = require('../');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('Tab', function() {
  var tab;
  var component;
  var element;
  var callback = jest.genMockFunction();

  beforeEach(function() {
    tab = <Tab onClick={ callback } onKeyDown={ callback } label={ 'foobar' } index={ 1 } active={ true } />;
    component = TestUtils.renderIntoDocument(tab);
    element = findByClass(component, 'Tab');
  });

  it('renders a tab with a name', function() {
    expect(element.getDOMNode().textContent).toBe('foobar');
    expect(element.getDOMNode().className).toContain('active');
  });

  it('calls an on click with an index', function() {
    TestUtils.Simulate.click(element);
    expect(callback).toBeCalledWith(1);
  });

  it('calls an on keydown function with an index', function() {
    TestUtils.Simulate.keyDown(element, { keyCode: 13 });
    expect(callback).toBeCalledWith(1);
  });
});
