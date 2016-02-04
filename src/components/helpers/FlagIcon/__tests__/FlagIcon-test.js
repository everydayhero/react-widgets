'use strict';
jest.autoMockOff();

var React = require('react');
var FlagIcon = require('../');
var TestUtils = require('react-addons-test-utils');
var findByClass = TestUtils.findRenderedDOMComponentWithClass

describe('FlagIcon', function() {
  it('renders a flag icon', function() {
    var element = TestUtils.renderIntoDocument(<FlagIcon country="au"/>);
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).toBe('flag au');
  });
});
