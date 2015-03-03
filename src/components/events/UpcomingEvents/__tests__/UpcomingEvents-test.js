'use strict';

jest.autoMockOff();
jest.mock('../../../../api/campaigns');
jest.mock('../../../../api/charities');

describe('UpcomingEvents', function() {
  var React          = require('react/addons');
  var UpcomingEvents = require('../');
  var campaigns      = require('../../../../api/campaigns');
  var charities      = require('../../../../api/charities');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var element;

    beforeEach(function() {
      var events = <UpcomingEvents charityUid="au1234" charitySlug="au-1234-slug" />;
      element = TestUtils.renderIntoDocument(events);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default a message if no results are returned', function() {
      element.setState({ content: this.renderIcon() });
      var emptyLabel = findByClass(element, 'UpcomingEvents__empty-label');
      expect(emptyLabel.getDOMNode().textContent).toContain('No events to display.');
    });

    it('renders a loading icon', function() {
      element.setState({ content: this.renderIcon() });
      findByClass(element, 'UpcomingEvents__loading');
    });

    it('renders if handed default charity uid, page, size', function() {
      expect(pages.findByCharity).toBeCalledWith('au1234','1','6', element.onSuccess);
    });
  });

  describe('component props', function() {
    var element;
    var translation = {
      heading: 'headings are cool',
      emptyLabel: 'empty labels are not cool'
    };

    beforeEach(function() {
      var events = <UpcomingEvents charityUid="au1234" charitySlug="au-1234-slug" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(events);
    });

    it('renders a default a message if no results are returned', function() {
      element.setState({ content: this.renderIcon() });
      var emptyLabel = findByClass(element, 'UpcomingEvents__empty-label');
      expect(emptyLabel.getDOMNode().textContent).toBe(translation.emptyLabel);
    });
  });
});
