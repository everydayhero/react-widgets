jest.disableAutomock();
jest.mock('../../../../api/pages');

import React from 'react';
import RecentFundraisers from '../';
import pages from '../../../../api/pages';
import TestUtils from 'react-addons-test-utils';

describe('RecentFundraisers', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    let recentFundraisers;
    let element;

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

      let emptyLabel = findByClass(element, 'RecentFundraisers__empty-label');
      expect(emptyLabel.textContent).toContain('No fundraisers to display.');
    });

    it('renders a default heading', function() {
      element.setState({ isLoading: false });
      let heading = findByClass(element, 'RecentFundraisers__heading');

      expect(heading.textContent).toBe('Fundraisers');
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'RecentFundraisers__loading');
    });

    it('renders if handed default campaign id, page type, count and size', function() {
      expect(pages.findByCampaign).toBeCalledWith('au-0','individual', 6, 1, element.onSuccess);
    });
  });

  describe('component props', function() {
    let recentFundraisers;
    let element;
    let translation = {
      heading: 'headings are cool',
      emptyLabel: 'empty labels are not cool'
    };

    beforeEach(function() {
      recentFundraisers = <RecentFundraisers i18n={ translation } />;
      element = TestUtils.renderIntoDocument(recentFundraisers);
    });

    it('renders a custom heading', function() {
      element.setState({isLoading: false});
      let heading = findByClass(element, 'RecentFundraisers__heading');

      expect(heading.textContent).toBe(translation.heading);
    });

    it('renders a custom empty label', function() {
      element.setState({
        isLoading: false,
        hasResults: false
      });
      let emptyLabel = findByClass(element, 'RecentFundraisers__empty-label');

      expect(emptyLabel.textContent).toBe(translation.emptyLabel);
    });
  });
});
