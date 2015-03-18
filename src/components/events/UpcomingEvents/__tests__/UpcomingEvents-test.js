'use strict';

jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('UpcomingEvents', function() {
  var React          = require('react/addons');
  var UpcomingEvents = require('../');
  var campaign       = require('../../../../api/campaigns');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('component', function() {
    var translation  = { emptyLabel: 'Nothing to see here!' };
    var element;

    beforeEach(function() {
      var events = <UpcomingEvents charityUid="au-1234" charitySlug="au-1234-slug" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(events);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default message if no results are returned', function() {
      element.setState({ content: element.renderEvents([]) });
      var emptyLabel = findByClass(element, 'UpcomingEvents__empty-label');
      expect(emptyLabel.getDOMNode().textContent).toContain(translation.emptyLabel);
    });

    it('renders a loading icon', function() {
      element.setState({ content: element.renderIcon() });
      findByClass(element, 'UpcomingEvents__loading');
    });

    it('renders if handed default charity uid, page, size', function() {
      expect(campaign.findByCharity).toBeCalledWith('au-1234', 1, 20, jasmine.any(Function));
    });
  });
});
