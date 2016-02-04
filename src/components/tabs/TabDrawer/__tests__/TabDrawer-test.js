"use strict";

jest.autoMockOff();

var React       = require('react');
var TabDrawer   = require('../');
var TestUtils   = require('react-addons-test-utils');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('TabDrawer', function() {
  var tabDrawer;
  var component;
  var element;
  var callback = jest.genMockFunction();

  beforeEach(function() {
    tabDrawer = <TabDrawer onClick={ callback } onKeyDown={ callback } label={ 'barbaz' } index={ 1 } active={ true } />;
    component = TestUtils.renderIntoDocument(tabDrawer);
    element   = findByClass(component, 'TabDrawer');
  });

  it('calls renders a tab drawer with a name', function() {
    expect(element.getDOMNode().textContent).toBe('barbaz');
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
