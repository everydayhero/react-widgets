jest.disableAutomock();

jest.mock('../../../../api/charities');
jest.mock('../../../../api/campaigns');
import charities from '../../../../api/charities';
import campaigns from '../../../../api/campaigns';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
import Supporters from '../';
import leaderboardData from './Supporters-data.json';

describe('Supporters', function() {
  var element;
  var callback;
  var props = {
    charityUid: 'us-123'
  };

  beforeEach(function() {
    charities.leaderboard.mockClear();
  });

  describe('with default params', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Supporters { ...props }/>);
      callback = charities.leaderboard.mock.calls[0][3];
    });

    it('renders', function() {
      expect(ReactDOM.findDOMNode(element)).not.toBeNull();
    });

    it('renders a Supporters element', function() {
      expect(findByClass(element, 'Supporters')).not.toBeNull();
    });

    describe('with pages', function() {
      beforeEach(function() {
        callback(leaderboardData);
      });

      it('contains SupporterCards', function() {
        var cards = scryByClass(element, 'SupporterCard');

        expect(cards.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('multiple campaignUids', function() {
  var supporters;

  beforeEach(function() {
    campaigns.leaderboardByUids.mockClear();
    supporters = <Supporters campaignUids={ ['us-22', 'us-19'] } />;
    TestUtils.renderIntoDocument(supporters);
  });

  it('handles multiple campaignUids', function() {
    expect(campaigns.leaderboardByUids.mock.calls.length).toEqual(1);
  });
});
