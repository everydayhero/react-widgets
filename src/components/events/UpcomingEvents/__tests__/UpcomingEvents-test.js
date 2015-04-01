'use strict';

jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('UpcomingEvents', function() {
  var React          = require('react/addons');
  var UpcomingEvents = require('../');
  var campaign       = require('../../../../api/campaigns');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass    = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('component', function() {
    var translation  = { emptyLabel: 'Nothing to see here!' };
    var element;

    beforeEach(function() {
      campaign.findByCharity.mockClear();
      var events = <UpcomingEvents charityUid="au-1234" charitySlug="au-1234-slug" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(events);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('initially renders loading icon', function() {
      findByClass(element, 'UpcomingEvents__loading');
    });

    it('renders an empty message when no results are returned', function() {
      element.setEvents([]);
      var emptyLabel = findByClass(element, 'UpcomingEvents__empty-label');
      expect(emptyLabel.getDOMNode().textContent).toContain(translation.emptyLabel);
    });

    it('renders events when results are returned', function() {
      var campaigns = [{
        id: 1,
        name: 'Blah',
        country_code: 'ie',
        display_finish_at: '2016-01-01',
        url: 'http://blah.com',
        get_started_url: 'https://blah.edheroy.com/ie/get-started',
        background_image_url: null,
        page_count: 2
      }];

      element.setEvents(campaigns);

      var events = scryByClass(element, 'Event');
      expect(events.length).toBe(1);
    });

    it('loads campaigns for given charity', function() {
      var options = { status: 'active', sortBy: 'finish_at', excludeCharities: true, excludePages: true, excludeBau: true };
      expect(campaign.findByCharity).toBeCalledWith('au-1234', 1, 20, jasmine.any(Function), options);

      var callback = campaign.findByCharity.mock.calls[0][3];
      callback({campaigns: []});

      findByClass(element, 'UpcomingEvents__empty-label');
    });
  });
});
