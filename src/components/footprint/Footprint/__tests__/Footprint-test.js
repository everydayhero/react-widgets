"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var _           = require('lodash');
var Footprint   = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
var findByProp  = require('../../../../test/helpers/scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;

window.requestAnimationFrame = require('../../../../test/helpers/requestAnimationFrame');

function simulateMouseOver(from, to) {
  TestUtils.SimulateNative.mouseOut(from, { relatedTarget: to });
  TestUtils.SimulateNative.mouseOver(to, { relatedTarget: from });
}

function rand() { // for Footprint dummy data
  return (Math.random() * 100 | 0) + 1;
}
var model = [
  {id:0, key:'community_raised', name:'Community Raised', group:'community', value:'$0.00', percentile:rand(), description: "The collective funds raised by people who care about the same causes as you."},
  {id:1, key:'community_engagement', name:'Community Engagement', group:'community', value:'467k', percentile:rand(), description: "The number of people supporting the causes you care about."},
  {id:2, key:'money_fundraising', name:'Fundraising', group:'money', value:'$4.8k', percentile:rand(), description: "The lifetime amount you have raised through fundraising for the causes you care about."},
  {id:3, key:'money_donations', name:'Donations', group:'money', value:'$9.8k', percentile:rand(), description: "The lifetime amount you have donated to the causes you care about."},
  {id:4, key:'voice_reach', name:'Reach', group:'voice', value:'4564', percentile:rand(), description: "How many people you have reached through your philanthropic activities and sharing."},
  {id:5, key:'voice_engagement', name:'Engagement', group:'voice', value:'36.8k', percentile:rand(), description: "How engaged you are with your supporters and other fundraisers."},
  {id:6, key:'effort_training', name:'Training', group:'effort', value:'64h', percentile:rand(), description: "The total duration you have trained in support of the causes you care about."},
  {id:7, key:'effort_volunteering', name:'Volunteering', group:'effort', value:'356h', percentile:rand(), description: "The total duration you have volunteered your talents for causes you care about."}
];

describe('Footprint', function() {
  var element;
  var props = {
    userUrl: 'http://everydayhero.com/us',
    userImage: 'http://thecatapi.com/?id=9h4',
    userName: "Wonderful Person",
    data: model
  };

  it('renders with defaults', function() {
    element = TestUtils.renderIntoDocument(<Footprint { ...props }/>);
    expect(element.getDOMNode()).not.toBeNull();
  });

  describe('FootprintTile', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Footprint { ...props }/>);
    });

    it('renders', function() {
      expect(element.getDOMNode()).not.toBeNull();
    });

    it('displays an avatar with title which links to a page', function() {
      var anchor = findByClass(element, 'FootprintAvatar').getDOMNode();
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
      expect(svg.getDOMNode()).not.toBeNull();
    });

    it('shows metric details on hover', function() {
      var svg = findByTag(element, 'svg');
      var communityRaisedSector = findByClass(svg, 'FootprintMetric--community_raised').getDOMNode();
      expect(communityRaisedSector).not.toBeNull();
      simulateMouseOver(element.getDOMNode(), communityRaisedSector);

      var metricData = findByClass(element, 'FootprintTile--flip');
      expect(metricData.getDOMNode()).not.toBeNull();

      var metricDataPercent = findByClass(metricData, 'FootprintData').getDOMNode();
      expect(metricDataPercent.textContent).toContain(model[0].percentile + '%');

      var tooltip = findByClass(element, 'FootprintTip');
      var tooltipName = findByClass(tooltip, 'FootprintTip__name').getDOMNode();
      var tooltipValue = findByClass(tooltip, 'FootprintTip__value').getDOMNode();
      var tooltipDescription = findByClass(tooltip, 'FootprintTip__description').getDOMNode();
      expect(tooltipName.textContent).toContain(model[0].name);
      expect(tooltipValue.textContent).toContain(model[0].value);
      expect(tooltipDescription.textContent).toContain(model[0].description);
    });
  });

  describe('FootprintGraph --compact', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Footprint { ...props } compact={ true }/>);
    });

    it('renders an svg', function() {
      var svg = findByTag(element, 'svg');
      expect(svg.getDOMNode()).not.toBeNull();
    });

    it('shows metric details in center on hover', function() {
      var svg = findByTag(element, 'svg');
      var voiceEngagementSector = findByClass(svg, 'FootprintMetric--voice_engagement').getDOMNode();
      expect(voiceEngagementSector).not.toBeNull();
      simulateMouseOver(element.getDOMNode(), voiceEngagementSector);

      var metricData = findByClass(element, 'FootprintTile--flip');
      expect(metricData.getDOMNode()).not.toBeNull();

      var dataPercent = findByClass(metricData, 'FootprintData__percent').getDOMNode();
      var dataValue = findByClass(metricData, 'FootprintData__value').getDOMNode();
      var dataName = findByClass(metricData, 'FootprintData__name').getDOMNode();
      expect(dataPercent.textContent).toContain(model[5].percentile);
      expect(dataValue.textContent).toContain(model[5].value);
      expect(dataName.textContent).toContain(model[5].name);
    });
  });
});
