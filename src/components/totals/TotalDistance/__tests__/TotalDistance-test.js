jest.disableAutomock();
jest.mock('../../../../api/campaigns');

import React from 'react';
import TotalDistance from '../';
import campaigns from '../../../../api/campaigns';
import TestUtils from 'react-addons-test-utils';

describe('TotalDistance', function() {
  let findByClass   = TestUtils.findRenderedDOMComponentWithClass;
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component when handed multiple uids', function() {
    let totalDistance;
    let element;

    beforeEach(function() {
      campaigns.findByUids.mockClear();
      totalDistance = <TotalDistance campaignUids={ ['us-22', 'us-24'] } />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an icon by default', function() {
      let icon = findByClass(element, 'TotalDistance__icon');
      expect(icon).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalDistance__loading');
    });

    it('handles multiple campaign uids', function() {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1);
      expect(campaigns.findByUids).toBeCalledWith(['us-22', 'us-24'], element.onSuccess);
    });
  });

  describe('Component when handed one uid', function() {
    let totalDistance;
    let element;

    beforeEach(function() {
      campaigns.findByUids.mockClear();
      totalDistance = <TotalDistance campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('handles a sinlge campaign uid', function() {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1);
      expect(campaigns.findByUids).toBeCalledWith(['us-22'], element.onSuccess);
    });
  });

  describe('Calculating miles/kilometers from meters', function() {
    it('Correctly calculates miles based on response', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" />;
      let element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({ isLoading: false });

      expect(element.formatDistance(1000)).toEqual('0.62');
    });

    it('correctly calculates kilometers based on response', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" unit="km" />;
      let element = TestUtils.renderIntoDocument(totalDistance);
      element.setState({ isLoading: false });

      expect(element.formatDistance(1000)).toEqual('1');
    });
  });

  describe('Custom component props', function() {
    let totalDistance;
    let element;
    let translation = {
      title: 'Ground Covered'
    };

    beforeEach(function() {
      totalDistance = <TotalDistance i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalDistance);
      element.setState({
        isLoading: false,
        total: 1000
      });
    });

    it('renders a custom title', function() {
      let title = findByClass(element, 'TotalDistance__title');
      expect(title.textContent).toBe(translation.title);
    });

    it('renders no icon', function() {
      expect(element.renderIcon()).toBeUndefined();
    });
  });

  describe('Number formatting options', function() {
    it('renders in a human readable format by default', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" unit="km" />;
      let element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        total: 1000050
      });

      let total = findByClass(element, 'TotalDistance__total');
      expect(total.textContent).toBe('1,000.05');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" unit="km" format="0.00" />;
      let element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        total: 1000050
      });

      let total = findByClass(element, 'TotalDistance__total');
      expect(total.textContent).toBe('1000.05');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" unit="km" renderIcon={ false } />;
      let element = TestUtils.renderIntoDocument(totalDistance);
      let icon = scryByClass(element, 'TotalDistance__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      let totalDistance = <TotalDistance campaignUid="au-0" unit="km" renderIcon="paw" />;
      let element = TestUtils.renderIntoDocument(totalDistance);
      let icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });
});
