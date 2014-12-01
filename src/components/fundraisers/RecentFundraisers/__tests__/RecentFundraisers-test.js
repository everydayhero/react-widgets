"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('RecentFundraisers', function() {
  var React                       = require('react/addons');
  var RecentFundraisers           = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var recentFundraisers;
    var element;

    beforeEach(function() {
      recentFundraisers = <RecentFundraisers campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(recentFundraisers);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default a message if no results are returned', function() {
      element.setState({
        isLoading: false,
        hasResults: false
      });

      var emptyLabel = findByClass(element, 'RecentFundraisers__empty-label');
      expect(emptyLabel.getDOMNode().textContent).toContain('No fundraisers to display.');
    });

    it('renders a default heading', function() {
      element.setState({ isLoading: false });
      var heading = findByClass(element, 'RecentFundraisers__heading');

      expect(heading.getDOMNode().textContent).toBe('Fundraisers');
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'RecentFundraisers__loading');
    });

    it('renders if handed default campaign id, page type, count and size', function() {
      expect(pages.findByCampaign).toBeCalledWith('au-0','user','6','1', element.onSuccess);
    });
  });

  describe('component props', function() {
    var recentFundraisers;
    var element;
    var translation = {
      heading: 'headings are cool',
      emptyLabel: 'empty labels are not cool'
    };

    beforeEach(function() {
      recentFundraisers = <RecentFundraisers i18n={ translation } />;
      element = TestUtils.renderIntoDocument(recentFundraisers);
    });

    it('renders a custom heading', function() {
      element.setState({isLoading: false});
      var heading = findByClass(element, 'RecentFundraisers__heading');

      expect(heading.getDOMNode().textContent).toBe(translation.heading);
    });

    it('renders a custom empty label', function() {
      element.setState({
        isLoading: false,
        hasResults: false
      });
      var emptyLabel = findByClass(element, 'RecentFundraisers__empty-label');

      expect(emptyLabel.getDOMNode().textContent).toBe(translation.emptyLabel);
    });
  });
});
