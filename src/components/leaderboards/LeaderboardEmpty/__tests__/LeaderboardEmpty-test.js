jest.disableAutomock();

import React from 'react';
import LeaderboardEmpty from '../';
import campaigns from '../../../../api/campaigns';
import TestUtils from 'react-addons-test-utils';

var mockCampaignResponse = {
  campaign: {
    slug: 'batman',
    country_code: 'us'
  }
};

describe('Generating a get started URL', function() {
  beforeEach(function() {
    campaigns.find = jest.genMockFunction().mockImplementation(function(id, callback) {
      callback(mockCampaignResponse);
    });
  });

  afterEach(function() {
    campaigns.find.mockClear();
  });

  it('does not make an API request if it already knows the slug and country', function() {
    var component = <LeaderboardEmpty campaignUid="abc-123" campaignSlug="foobar" country="au" />;
    var element = TestUtils.renderIntoDocument(component);
    expect(campaigns.find.mock.calls.length).toBe(0);
    expect(element.state.getStartedUrl).toEqual('https://foobar.everydayhero.com/au/get-started');
  });

  it('makes an API request to learn the slug and country', function() {
    var component = <LeaderboardEmpty campaignUid="abc-123" />;
    var element = TestUtils.renderIntoDocument(component);
    expect(campaigns.find.mock.calls.length).toBe(1);
    expect(element.state.getStartedUrl).toEqual('https://batman.everydayhero.com/us/get-started');
  });

  it('sets to a generic sign up URL if there are multiple campaign ids', function() {
    var component = <LeaderboardEmpty campaignUids={ ['abc-123', 'xyz-456'] } />;
    var element = TestUtils.renderIntoDocument(component);
    expect(campaigns.find.mock.calls.length).toBe(1);
    expect(element.state.getStartedUrl).toEqual('https://everydayhero.com/us/sign-up');
  });
});
