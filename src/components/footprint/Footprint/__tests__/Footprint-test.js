jest.disableAutomock();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footprint from '../';
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByTag   = TestUtils.findRenderedDOMComponentWithTag;

window.requestAnimationFrame = require('../../../../test/helpers/requestAnimationFrame');

function simulateMouseOver(from, to) {
  TestUtils.SimulateNative.mouseOut(from, { relatedTarget: to });
  TestUtils.SimulateNative.mouseOver(to, { relatedTarget: from });
}

var model = [
  { key: 'cause_raised', group: 'community', amount_formatted: '$0.00', percentile: 10 },
  { key: 'cause_engagement', group: 'community', amount_formatted: '467k', percentile: 20 },
  { key: 'raised', group: 'money', amount_formatted: '$4.8k', percentile: 30 },
  { key: 'given', group: 'money', amount_formatted: '$9.8k', percentile: 40 },
  { key: 'page_views', group: 'voice', amount_formatted: '36.8k', percentile: 50 },
  { key: 'sharing', group: 'voice', amount_formatted: '4564', percentile: 60 },
  { key: 'duration_volunteered', group: 'effort', amount_formatted: '64h', percentile: 70 },
  { key: 'duration_trained', group: 'effort', amount_formatted: '356h', percentile: 80 }
];

describe('Footprint', function() {
  var element;
  var props = {
    userUrl: 'http://everydayhero.com/us',
    userImage: 'http://thecatapi.com/?id=9h4',
    userName: 'Wonderful Person',
    data: model
  };

  it('renders with defaults', function() {
    element = TestUtils.renderIntoDocument(<Footprint { ...props }/>);
    expect(element).not.toBeNull();
  });

  describe('FootprintTile', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Footprint { ...props }/>);
    });

    it('renders', function() {
      expect(element).not.toBeNull();
    });

    it('displays an avatar with title which links to a page', function() {
      var anchor = findByClass(element, 'FootprintAvatar');
      expect(anchor.href).toBe(props.userUrl);
      expect(anchor.title).toBe(props.userName);
      expect(anchor.style.backgroundImage).toBe('url('+props.userImage+')');
    });
  });

  describe('FootprintGraph', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Footprint { ...props }/>);
    });

    it('renders an svg', function() {
      var svg = findByTag(element, 'svg');
      expect(svg).not.toBeNull();
    });

    it('shows metric details on hover', function() {
      var causeRaisedSector = findByClass(element, 'FootprintMetric--cause_raised');
      expect(causeRaisedSector).not.toBeNull();
      simulateMouseOver(ReactDOM.findDOMNode(element), causeRaisedSector);

      findByClass(element, 'FootprintTile--flip');

      var metricDataPercent = findByClass(element, 'FootprintData');
      expect(metricDataPercent.textContent).toContain(model[0].percentile + '%');

      var tooltipName = findByClass(element, 'FootprintTip__name');
      var tooltipValue = findByClass(element, 'FootprintTip__value');
      var tooltipDescription = findByClass(element, 'FootprintTip__description');
      expect(tooltipName.textContent).toContain('Community Raised');
      expect(tooltipValue.textContent).toContain(model[0].amount_formatted);
      expect(tooltipDescription.textContent).toContain('The collective funds raised by the people who care about the same causes.');
    });
  });

  describe('FootprintGraph --compact', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Footprint { ...props } compact />);
    });

    it('renders an svg', function() {
      var svg = findByTag(element, 'svg');
      expect(svg).not.toBeNull();
    });

    it('shows metric details in center on hover', function() {
      var voiceEngagementSector = findByClass(element, 'FootprintMetric--sharing');
      expect(voiceEngagementSector).not.toBeNull();
      simulateMouseOver(ReactDOM.findDOMNode(element), voiceEngagementSector);

      findByClass(element, 'FootprintTile--flip');

      var dataValue = findByClass(element, 'FootprintData__value');
      var dataName = findByClass(element, 'FootprintData__name');
      expect(dataValue.textContent).toContain(model[5].amount_formatted);
      expect(dataName.textContent).toContain('Sharing');
    });
  });
});
