"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TotalDonations', function() {
  var React          = require('react/addons');
  var TotalDonations = require('../');
  var pages          = require('../../../../api/pages');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('Component defaults', function() {
    var totalDonations;
    var element;

    beforeEach(function() {
      pages.findByCampaign.mockClear();
      totalDonations = <TotalDonations campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('render something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total of pages', function() {
      element.setState({ isLoading: false });

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.getDOMNode().textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });

      var title = findByClass(element, 'TotalDonations__title');
      expect(title.getDOMNode().textContent).toBe('Donations');
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
      expect(pages.findByCampaign.mock.calls.length).toEqual(1);
      expect(pages.findByCampaign).toBeCalledWith("us-22", 'individual', 1, 1, element.onSuccess);
    });
  });

  describe('Working with multiple uids', function() {
    var totalDonations;
    var element;

    beforeEach(function() {
      pages.findByCampaign.mockClear();
      totalDonations = <TotalDonations campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalDonations);
    });

    it('makes multiple calls to fetch api data', function() {
      expect(pages.findByCampaign.mock.calls.length).toEqual(2);
      expect(pages.findByCampaign).toBeCalledWith("us-22", 'individual', 1, 1, element.onSuccess);
      expect(pages.findByCampaign).toBeCalledWith("us-24", 'individual', 1, 1, element.onSuccess);
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

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalDonations__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a standard format by default', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.getDOMNode().textContent).toBe('10,050');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalDonations = <TotalDonations campaignUid="au-0" format="0.00" />;
      var element = TestUtils.renderIntoDocument(totalDonations);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalDonations__total');
      expect(total.getDOMNode().textContent).toBe('10050.00');
    });
  });
});
