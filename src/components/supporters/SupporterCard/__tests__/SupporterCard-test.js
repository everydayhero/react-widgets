"use strict";
jest.autoMockOff();

var React         = require('react/addons');
var TestUtils     = React.addons.TestUtils;
var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
var SupporterCard = require('../');

describe('SupporterCard', function() {
  var element;
  var props = {
    footprint: [],
    image: 'blah.png',
    url: 'https://give.everydayhero.com/us/blah',
    name: 'Blah',
    target: 4321,
    current: 1234,
    currency: '$',
    width: 300
  };

  beforeEach(function() {
    element = TestUtils.renderIntoDocument(<SupporterCard { ...props }/>);
  });

  it('renders', function() {
    expect(element.getDOMNode()).not.toBeNull();
  });

  it('contains a SupporterCard element', function() {
    expect(findByClass(element, 'SupporterCard')).not.toBeNull();
  });

  it('contains a Footprint element', function() {
    expect(findByClass(element, 'Footprint')).not.toBeNull();
  });

  it('contains a SupporterCardGiveNow element', function() {
    expect(findByClass(element, 'SupporterCardGiveNow')).not.toBeNull();
  });
});
