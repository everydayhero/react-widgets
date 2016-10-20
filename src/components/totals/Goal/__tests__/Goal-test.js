jest.disableAutomock();

import React from 'react';
import Goal from '../';
import TestUtils from 'react-addons-test-utils';

describe('Goal', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    let goal;
    let element;

    beforeEach(function() {
      goal = <Goal />;
      element = TestUtils.renderIntoDocument(goal);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      let total = findByClass(element, 'Goal__total');

      expect(total.textContent).toContain('$0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      let title = findByClass(element, 'Goal__title');

      expect(title.textContent).toBe('Goal');
    });

    it('renders an icon by default', function() {
      let icon = findByClass(element, 'Goal__icon');
      expect(icon).not.toBeNull();
    });
  });

  describe('Custom component props', function() {
    let goal;
    let element;
    let translation = {
      title: 'asdjasj',
      symbol: '£',
      suffix: ' abc'
    };

    beforeEach(function() {
      goal = <Goal goal="50000" i18n={ translation } handleCents={ false } />;
      element = TestUtils.renderIntoDocument(goal);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      let title = findByClass(element, 'Goal__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('checks for a total with custom symbol and suffix', function() {
      element.setState({ isLoading: false });
      let total = findByClass(element, 'Goal__total');

      expect(total.textContent).toBe('£50 k abc');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a short format by default', function() {
      let goal = <Goal goal="5000000" />;
      let element = TestUtils.renderIntoDocument(goal);
      let total = findByClass(element, 'Goal__total');

      expect(total.textContent).toBe('$50 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      let goal = <Goal goal="5000000" format="0,0.00" />;
      let element = TestUtils.renderIntoDocument(goal);
      let total = findByClass(element, 'Goal__total');

      expect(total.textContent).toBe('$50,000.00');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      let goal = <Goal goal="5000000" renderIcon={ false } />;
      let element = TestUtils.renderIntoDocument(goal);
      let icon = scryByClass(element, 'Goal__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      let goal = <Goal goal="5000000" renderIcon="paw" />;
      let element = TestUtils.renderIntoDocument(goal);
      let icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });
});
