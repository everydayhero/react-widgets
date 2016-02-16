'use strict';

jest.autoMockOff();
jest.mock('../../../../api/totals');

describe('TotalDonations', function() {
  var React          = require('react');
  var TotalDonations = require('../');
  var totals         = require('../../../../api/totals');
  var TestUtils      = require('react-addons-test-utils');
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var totalDonations;
    var element;

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

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });

      var title = findByClass(element, 'TotalDonations__title');
      expect(title.textContent).toBe('Donations');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalDonations__icon');
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

  describe('Working with multiple uids', function() {
    var totalDonations;
    var element;

    beforeEach(function() {
      totals.findByCampaigns.mockClear();
      totalDonations = <TotalDonations campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('makes multiple calls to fetch api data', function() {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1);
      expect(totals.findByCampaigns).toBeCalledWith({campaignUids: ["us-22", "us-24"]}, element.onSuccess, {});
    });
  });

  describe('single charity id', function() {
    var totalDonations;
    var element;

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
    var totalDonations;

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
    var totalDonations;
    var element;
    var translation = {
      title: 'foo'
    };

    beforeEach(function() {
      totalDonations = <TotalDonations i18n={ translation } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalDonations__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalDonations__total');

      expect(total.textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a standard format by default', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 1000
      });

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toBe('1,000');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" format="0[.]00" />;
      var element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 1000
      });

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.textContent).toBe('1000');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(totalDonations);
      var icon = scryByClass(element, 'TotalDonations__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(totalDonations);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });

  describe('takes startAt property', function() {
    var totalDonations;
    var element;

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
    var totalDonations;
    var element;

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
});
