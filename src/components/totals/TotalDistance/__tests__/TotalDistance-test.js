"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('TotalDistance', function() {
  var React         = require('react/addons');
  var TotalDistance = require('../');
  var campaigns     = require('../../../../api/campaigns');
  var TestUtils     = React.addons.TestUtils;
  var findByClass   = TestUtils.findRenderedDOMComponentWithClass;

  describe('Component defaults', function() {
    var totalDistance;
    var element;

    beforeEach(function() {
      totalDistance = <TotalDistance campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalDistance__icon');

      expect(icon).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'TotalDistance__loading');
    });

    it('handles a campaign id', function() {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('Calculating miles/kilometers from meters', function() {
    it('Correctly calculates miles based on response', function() {
      var totalDistance = <TotalDistance campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        hasResults: true
      });

      expect(element.formatDistance(1000)).toEqual('0.62');
    });

    it('Correctly calculates kilometers based on response', function() {
      var totalDistance = <TotalDistance campaignUid="au-0" unit="km" />;
      var element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        hasResults: true
      });

      expect(element.formatDistance(1000)).toEqual('1');
    });
  });

  describe('Custom component props', function() {
    var totalDistance;
    var element;
    var translation = {
      title: 'Hours'
    };

    beforeEach(function() {
      totalDistance = <TotalDistance i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalDistance);
      element.setState({
        isLoading: false,
        hasResults: true
      });
    });

    it('renders a custom title', function() {
      var title = findByClass(element, 'TotalDistance__title');
      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders no icon', function() {
      expect(element.renderIcon()).toBeUndefined();
    });
  });

  describe('Number formatting options', function() {
    it('renders in a human readable format by default', function() {
      var totalDistance = <TotalDistance campaignUid="au-0" unit="km" />;
      var element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        hasResults: true,
        total: 1000050
      });

      var total = findByClass(element, 'TotalDistance__total');
      expect(total.getDOMNode().textContent).toBe('1,000.05');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalDistance = <TotalDistance campaignUid="au-0" unit="km" format="0.00" />;
      var element = TestUtils.renderIntoDocument(totalDistance);

      element.setState({
        isLoading: false,
        hasResults: true,
        total: 1000050
      });

      var total = findByClass(element, 'TotalDistance__total');
      expect(total.getDOMNode().textContent).toBe('1000.05');
    });
  });
});
