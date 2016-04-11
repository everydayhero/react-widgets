'use strict';

jest.autoMockOff();

var React          = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var findByClass    = ReactTestUtils.findRenderedDOMComponentWithClass;
var scryByClass    = ReactTestUtils.scryRenderedDOMComponentsWithClass;

var CampaignGoalItem = require('../')

describe('Rendering default components', function() {
  var campaignGoalItem;
  var element;

  beforeEach(function() {
    campaignGoalItem = <CampaignGoalItem name="foo" goal={ 400 } count={ 200 } />;
    element = ReactTestUtils.renderIntoDocument(campaignGoalItem);
  });

  it('will render a goal container', function() {
    var container = findByClass(element, 'CampaignGoal__container');
    expect(container).not.toBeNull();
  });

  it('will render a campaign title', function() {
    element = scryByClass(element, 'CampaignGoal__title');
    expect(element.length).toEqual(1);
    expect(element[0].textContent).toEqual('foo');
  });
})
