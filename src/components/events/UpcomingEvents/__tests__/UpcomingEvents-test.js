jest.disableAutomock();
jest.mock('../../../../api/campaigns');

import React from 'react';
import UpcomingEvents from '../';
import campaign from '../../../../api/campaigns';
import TestUtils from 'react-addons-test-utils';
var scryByClass    = TestUtils.scryRenderedDOMComponentsWithClass;

var campaigns = [{
  id: 1,
  name: 'Foo',
  country_code: 'ie',
  display_start_at: '2015-11-01',
  url: 'http://foo.com',
  get_started_url: 'https://foo.edheroy.com/ie/get-started',
  background_image_url: null,
  page_count: 2,
  funds_raised: {
    cents: 0,
    currency: { symbol: '$' }
  }
}, {
  id: 2,
  name: 'Bar',
  country_code: 'ie',
  display_start_at: '2015-05-30',
  url: 'http://bar.com',
  get_started_url: 'https://bar.edheroy.com/ie/get-started',
  background_image_url: null,
  page_count: 2,
  funds_raised: {
    cents: 0,
    currency: { symbol: '$' }
  }
}];

describe('UpcomingEvents', function() {
  describe('component', function() {
    var translation  = { emptyLabel: 'Nothing to see here!' };
    var element;

    beforeEach(function() {
      campaign.findByCharity.mockClear();
      var events = <UpcomingEvents charityUid="au-1234" charitySlug="au-1234-slug" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(events);
    });

    it('renders', function() {
      expect(element).not.toBeNull();
    });

    it('renders events when results are returned', function() {
      element.onEventLoad({ campaigns: campaigns });

      var events = scryByClass(element, 'Event');
      expect(events.length).toBe(campaigns.length);
    });

    it('sorts events by display_start_date', function() {
      element.onEventLoad({ campaigns: campaigns });

      expect(scryByClass(element, 'Event__name')[0].textContent).toContain('Bar');
      expect(scryByClass(element, 'Event__name')[1].textContent).toContain('Foo');
    });

    it('loads campaigns for given charity', function() {
      var options = { status: 'active', sortBy: 'start_at', excludeCharities: true, excludePages: true, excludeBau: true };
      expect(campaign.findByCharity).toBeCalledWith('au-1234', 1, null, jasmine.any(Function), options);

      var callback = campaign.findByCharity.mock.calls[0][3];
      callback({ campaigns: [] });
    });
  });
});
