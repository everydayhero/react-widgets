jest.disableAutomock();
jest.mock('../../../../api/totals');

import React from 'react';
import TotalDonations from '../';
import totals from '../../../../api/totals';
import TestUtils from 'react-addons-test-utils';

describe('TotalDonations', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;
  let scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCampaigns.mockClear();
      totalDonations = <TotalDonations campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total of donations', function() {
      element.setState({ isLoading: false });

      let total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });

      let title = findByClass(element, 'TotalDonations__title');
      expect(title.textContent).toBe('Donations');
    });

    it('renders an icon by default', function() {
      let icon = findByClass(element, 'TotalDonations__icon');
      expect(icon).not.toBeNull();
    });

    it('shows a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalDonations__loading');
    });

    it('makes a single call using to fetch api data', function() {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1);
      expect(totals.findByCampaigns).toBeCalledWith({campaignUids: "us-22"}, element.onSuccess, {});
    });
  });

  describe('Working with multiple uid types', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByAll.mockClear();
      totalDonations = <TotalDonations campaignUids={ ["us-22", "us-24"] } charityUids={ ["au-24", "au-27"] } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('makes multiple calls to fetch api data', function() {
      expect(totals.findByAll.mock.calls.length).toEqual(1);
      expect(totals.findByAll).toBeCalledWith({campaignUids: ["us-22", "us-24"], charityUids: ["au-24", "au-27"]}, element.onSuccess, {});
    });
  });

  describe('single charity id', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUids="au-24" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('handles a single charity id', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-24"}, element.onSuccess, {});
    });
  });

  describe('single charity id', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUids="au-24" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('handles a single charity id', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-24"}, element.onSuccess, {});
    });
  });

  describe('multiple charity ids', function() {
    let totalDonations;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUids={ ["au-24", "au-27"] } />;
      TestUtils.renderIntoDocument(totalDonations);
    });

    it('handles multiple charity ids', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
    });
  });

  describe('Custom component props', function() {
    let totalDonations;
    let element;
    let translation = {
      title: 'foo'
    };

    beforeEach(function() {
      totalDonations = <TotalDonations i18n={ translation } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      let title = findByClass(element, 'TotalDonations__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      let total = findByClass(element, 'TotalDonations__total');

      expect(total.textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a standard format by default', function() {
      let totalDonations = <TotalDonations campaignUid="au-0" />;
      let element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 1000
      });

      let total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toBe('1,000');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      let totalDonations = <TotalDonations campaignUid="au-0" format="0[.]00" />;
      let element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 1000
      });

      let total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toBe('1000');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      let totalDonations = <TotalDonations campaignUid="au-0" renderIcon={ false } />;
      let element = TestUtils.renderIntoDocument(totalDonations);
      let icon = scryByClass(element, 'TotalDonations__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      let totalDonations = <TotalDonations campaignUid="au-0" renderIcon="paw" />;
      let element = TestUtils.renderIntoDocument(totalDonations);
      let icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });

  describe('takes startAt property', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUid="au-31" startAt="2015-01-01" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('handles a startAt property', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-31"}, element.onSuccess, {start:'2015-01-01'});
    });
  });

  describe('takes endAt property', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUid="au-24" endAt="2015-06-01" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('handles a endAt property', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-24"}, element.onSuccess, {end:'2015-06-01'});
    });
  });

  describe('custom offset', function() {
    let totalDonations;
    let element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      totalDonations = <TotalDonations charityUid="au-24" offset={ 10000 } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('renders with a custom donations offset', function() {
      element.setState({ total: 10000, isLoading: false });
      let total = findByClass(element, 'TotalDonations__total');

      expect(total.textContent).toContain('20,000');
    });
  });
});
