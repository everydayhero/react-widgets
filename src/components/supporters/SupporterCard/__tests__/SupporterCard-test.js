jest.disableAutomock();

import React from 'react';
import TestUtils from 'react-addons-test-utils';
var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
import SupporterCard from '../';

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
    expect(element).not.toBeNull();
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
