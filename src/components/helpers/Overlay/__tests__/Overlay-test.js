/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var Overlay     = require('../');

describe('Overlay', function() {
  it('renders something', function() {
      var overlay = <Overlay />;
      var element = TestUtils.renderIntoDocument(overlay);
      expect(element.getDOMNode()).toBeTruthy();
  });

  it('calls the onClose prop when clicking the close button', function() {
    var spy = jasmine.createSpy();
    var overlay = <Overlay onClose={spy} />;
    var element = TestUtils.renderIntoDocument(overlay);
    var closeButton = scryByClass(element, 'Overlay__close');
    TestUtils.Simulate.click(closeButton[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('renders header items if set in props', function() {
    var header = <div className="foo">Bar</div>
    var overlay = <Overlay header={ header } />;
    var element = TestUtils.renderIntoDocument(overlay);

    var header = findByClass(element, 'foo');
    expect(header.getDOMNode().textContent).toBe('Bar');
  });
});
