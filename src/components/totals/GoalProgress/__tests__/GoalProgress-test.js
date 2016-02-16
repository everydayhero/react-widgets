"use strict";
jest.autoMockOff();

describe('GoalProgress', function() {
  var React        = require('react');
  var GoalProgress = require('../');
  var TestUtils    = require('react-addons-test-utils');
  var findByClass  = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass  = TestUtils.scryRenderedDOMComponentsWithClass;

  var props = { total: 15000, goal: 30000, text: 'foobar' };
  var element;

  beforeEach(function() {
    element = TestUtils.renderIntoDocument(<GoalProgress { ...props } />);
  });

  it('renders something', function() {
    expect(element).not.toBeNull();
  });

  it('renders progress text', function() {
    var text = findByClass(element, 'GoalProgress__text');
    expect(text.textContent).toContain('foobar');
  });

  it('renders a progress bar', function() {
    findByClass(element, 'GoalProgress__bar');
  });

  it('does not render a progress bar when no goal', function() {
    element = TestUtils.renderIntoDocument(<GoalProgress total={ 15000 } />);
    expect(scryByClass(element, 'GoalProgress__bar').length).toBe(0);
  });

  it('renders a trophy icon', function() {
    findByClass(element, 'GoalProgress__icon');
    findByClass(element, 'fa-trophy');
  });
});
