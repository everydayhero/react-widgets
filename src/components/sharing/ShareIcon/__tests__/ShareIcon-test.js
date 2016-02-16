'use strict';

jest.autoMockOff();
jest.mock('../../../../lib/openPopup');

var React     = require('react');
var ReactDOM  = require('react-dom');
var ShareIcon = require('../');
var TestUtils = require('react-addons-test-utils');
var openPopup = require('../../../../lib/openPopup');

describe('Share Icon component', function() {
  var shareIcon;
  var component;
  var props = {
    name: 'mock',
    icon: 'mock-icon',
    url: 'http://mock-url.com/'
  };

  var popUpConfig = {
    toolbar: 0,
    status: 0,
    width: 640,
    height: 320
  };

  beforeEach(function() {
    shareIcon = <ShareIcon { ...props } />;
    component = TestUtils.renderIntoDocument(shareIcon);
    openPopup.mockClear();
  });

  it('renders something', function() {
    expect(component).not.toBeNull();
  });

  it('renders an icon', function() {
    var element = ReactDOM.findDOMNode(component);
    expect(element.classList.contains('ShareIcon')).toBe(true);
    expect(element.classList.contains('ShareIcon__' + props.name)).toBe(true);
  });

  it('opens a pop up when an icon is clicked', function() {
    var element = ReactDOM.findDOMNode(component);
    TestUtils.Simulate.click(element);

    expect(openPopup).lastCalledWith("http://mock-url.com/", popUpConfig);
  });
});
