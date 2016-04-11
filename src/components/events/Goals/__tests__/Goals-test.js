'use strict';

jest.autoMockOff();
jest.mock('../../../../api/totals');

var CampaignGoals  = require('../')
var totals         = require('../../../../api/totals');
var React          = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var findByClass    = ReactTestUtils.findRenderedDOMComponentWithClass;


describe('Rendering default components', function() {
  var campaignTotals;
  var element;
  totals.findByCampaigns.mockClear();
  beforeEach(function(){
    campaignTotals = <CampaignGoals campaigns={ [{
      uid: 'us-22',
      name: 'Campaign',
      goal: 65000
    }] } />;
    element = ReactTestUtils.renderIntoDocument(campaignTotals);
  });

  it('will render a goals container', function() {
    var container = findByClass(element, 'CampaignGoals__container');
    expect(container).not.toBeNull();
  });
});

describe('API Calls', function() {
  var campaignTotals;
  var element;
  beforeEach(function() {
    totals.findByCampaigns.mockClear();
    campaignTotals = <CampaignGoals campaigns={ [{
      uid: 'us-22',
      name: 'Campaign 1',
      goal: 65000
    }, {
      uid: 'us-24',
      name: 'Campaign 3',
      goal: 8000
    }] } />;
    element = ReactTestUtils.renderIntoDocument(campaignTotals);
  });

  it('will make one call for each specified campaign UID', function() {
    expect(totals.findByCampaigns.mock.calls.length).toEqual(2);
    expect(totals.findByCampaigns).toBeCalledWith({campaignUids: "us-22"}, element.onSuccess);
    expect(totals.findByCampaigns).toBeCalledWith({campaignUids: "us-24"}, element.onSuccess);
  });
});
