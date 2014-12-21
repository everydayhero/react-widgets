"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('TotalCharities', function() {
  var React          = require('react/addons');
  var TotalCharities = require('../');
  var charities      = require('../../../../api/charities');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
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

      expect(total.getDOMNode().textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalCharities__title');

      expect(title.getDOMNode().textContent).toBe('Non Profits');
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

  describe('component props', function() {
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

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalCharities__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });
  });
});
