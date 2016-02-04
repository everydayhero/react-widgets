"use strict";
jest.autoMockOff();

var React                 = require('react');
var TestUtils             = require('react-addons-test-utils');
var findByClass           = TestUtils.findRenderedDOMComponentWithClass;
var SupporterCardGiveNow  = require('../');
var ReactDOM              = require('react-dom')

describe('SupporterCardGiveNow', function() {
  var element;
  var props = {
    current: 1234,
    target: 4321,
    url: 'https://give.everydayhero.com/us/blah'
  };

  beforeEach(function() {
    element = TestUtils.renderIntoDocument(<SupporterCardGiveNow { ...props }/>);
  });

  it('renders', function() {
    expect(ReactDOM.findDOMNode(element)).not.toBeNull();
  });

  it('contains a SupporterCardGiveNow element', function() {
    expect(findByClass(element, 'SupporterCardGiveNow')).not.toBeNull();
  });

  it('contains a call to action', function() {
    var cta = findByClass(element, 'SupporterCardGiveNow__cta');
    expect(cta).not.toBeNull();
    expect(cta.textContent).toContain('Give Now');
  });

  it('contains a progress bar', function() {
    var progress = findByClass(element, 'SupporterCardGiveNow__progress');
    expect(progress).not.toBeNull();

    var current = findByClass(element, 'SupporterCardGiveNow__current');
    expect(current.style.width).toBe('28%');
  });

  it('displays the amount remaining', function() {
    var label = findByClass(element, 'SupporterCardGiveNow__label');
    expect(label.textContent).toContain('Only $3087 to go');
  });
});
