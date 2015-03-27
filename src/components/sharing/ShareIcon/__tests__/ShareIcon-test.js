"use strict";

jest.autoMockOff();

var React       = require('react/addons');
var ShareIcon   = require('../');
var Icon        = require('../../../helpers/Icon');
var TestUtils   = React.addons.TestUtils;

describe('Share Icon component', function() {
  var shareIcon;
  var component;
  var props = {
    name: 'mock-icon',
    icon: 'mock',
    open: jest.genMockFunction()
  };

  beforeEach(function() {
    shareIcon = <ShareIcon { ...props } />;
    component = TestUtils.renderIntoDocument(shareIcon);
  });

  it('renders something', function() {
    expect(component).not.toBeNull();
  });

  it('renders an icon', function() {
    var element = component.getDOMNode();
    expect(element.className).toContain('ShareIcon');
    expect(element.className).toContain(props.name);
  });

  it('calls an on click with an index', function() {
    TestUtils.Simulate.click(component.getDOMNode());
    expect(props.open).toBeCalled();
  });
});
