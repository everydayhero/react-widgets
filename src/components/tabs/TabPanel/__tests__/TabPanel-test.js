"use strict";

jest.autoMockOff();

var React       = require('react');
var TabPanel    = require('../');
var TestUtils   = require('react-addons-test-utils');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('TabPanel', function() {
  var tabPanel;
  var component;
  var element;

  beforeEach(function() {
    tabPanel = <TabPanel content="Hello world!" active={ true } index={ 1 } labelledBy="tab-1" />;
    component = TestUtils.renderIntoDocument(tabPanel);
    element   = findByClass(component, 'TabPanel');
  });

  it('calls renders a tab panel with content', function() {
    expect(element.textContent).toBe('Hello world!');
    expect(element.className).toContain('active');
    expect(element.getAttribute('role')).toBe('tabpanel');
    expect(element.getAttribute('aria-labelledby')).toBe('tab-1');
  });
});
