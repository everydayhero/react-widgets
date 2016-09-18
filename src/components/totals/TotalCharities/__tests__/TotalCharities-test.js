jest.disableAutomock();
jest.mock('../../../../api/charities');

import React from 'react';
import TotalCharities from '../';
import charities from '../../../../api/charities';
import TestUtils from 'react-addons-test-utils';

describe('TotalCharities', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var totalCharities;
    var element;

    beforeEach(function() {
      charities.findByCampaign.mockClear();
      totalCharities = <TotalCharities campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalCharities);
    });

    it('render something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total charities', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalCharities__total');

      expect(total.textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalCharities__title');

      expect(title.textContent).toBe('Non Profits');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalCharities__icon');

      expect(icon).not.toBeNull();
    });

    it('shows a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalCharities__loading');
    });

    it('check that a campaign id is present', function() {
      expect(charities.findByCampaign.mock.calls.length).toEqual(1);
      expect(charities.findByCampaign).toBeCalledWith(["us-22", "us-24"], 1, 1, element.onSuccess);
    });
  });

  describe('Custom component props', function() {
    var totalCharities;
    var element;
    var translation = {
      title: 'blahblah'
    };

    beforeEach(function() {
      totalCharities = <TotalCharities i18n={ translation } />;
      element = TestUtils.renderIntoDocument(totalCharities);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalCharities__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalCharities__total');

      expect(total.textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a short format by default', function() {
      var totalCharities = <TotalCharities campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalCharities);

      element.setState({
        isLoading: false,
        total: 10000
      });

      var total = findByClass(element, 'TotalCharities__total');
      expect(total.textContent).toBe('10 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalCharities = <TotalCharities campaignUid="au-0" format="0,0" />;
      var element = TestUtils.renderIntoDocument(totalCharities);

      element.setState({
        isLoading: false,
        total: 10000
      });

      var total = findByClass(element, 'TotalCharities__total');
      expect(total.textContent).toBe('10,000');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var totalCharities = <TotalCharities campaignUid="au-0" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(totalCharities);
      var icon = scryByClass(element, 'TotalCharities__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var totalCharities = <TotalCharities campaignUid="au-0" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(totalCharities);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });
});
