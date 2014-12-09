"use strict";
jest.autoMockOff();

var React = require('react/addons');
var FlagIcon = require('../');
var TestUtils = React.addons.TestUtils;

describe('FlagIcon', function() {
  it('renders a flag icon', function() {
    var element = TestUtils.renderIntoDocument(<FlagIcon country="au"/>);
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).toBe('flag au');
  });
});
