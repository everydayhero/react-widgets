jest.disableAutomock();
jest.mock('../../../../api/pages');

import React from 'react';
import Teams from '../';
import TestUtils from 'react-addons-test-utils';

describe('Teams', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    let teams;
    let element;

    beforeEach(function() {
      teams = <Teams campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(teams);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default a message if no results are returned', function() {
      element.setState({
        isLoading: false,
        hasResults: false
      });

      let emptyLabel = findByClass(element, 'Teams__empty-label');
      expect(emptyLabel.textContent).toContain('No teams to display.');
    });

    it('renders a default heading', function() {
      element.setState({ isLoading: false });
      let heading = findByClass(element, 'Teams__heading');

      expect(heading.textContent).toBe('Teams');
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'Teams__loading');
    });
  });

  describe('component props', function() {
    let teams;
    let element;
    let translation = {
      heading: 'headings are cool',
      emptyLabel: 'empty labels are not cool'
    };

    beforeEach(function() {
      teams = <Teams i18n={ translation } />;
      element = TestUtils.renderIntoDocument(teams);
    });

    it('renders a custom heading', function() {
      element.setState({isLoading: false});
      let heading = findByClass(element, 'Teams__heading');

      expect(heading.textContent).toBe(translation.heading);
    });

    it('renders a custom empty label', function() {
      element.setState({
        isLoading: false,
        hasResults: false
      });
      let emptyLabel = findByClass(element, 'Teams__empty-label');

      expect(emptyLabel.textContent).toBe(translation.emptyLabel);
    });
  });
});
