"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('TotalCalories', function() {
  var React         = require('react/addons');
  var TotalCalories = require('../');
  var campaigns     = require('../../../../api/campaigns');
  var TestUtils     = React.addons.TestUtils;
  var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass   = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component when handed multiple uids', function() {
    var totalCalories;
    var element;

    beforeEach(function() {
      campaigns.findByUids.mockClear();
      totalCalories = <TotalCalories campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalCalories);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalCalories__icon');
      expect(icon).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalCalories__loading');
    });

    it('handles multiple campaign uids', function() {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1);
      expect(campaigns.findByUids).toBeCalledWith(["us-22", "us-24"], element.onSuccess);
    });
  });

  describe('Component when handed one uid', function() {
    var totalCalories;
    var element;

    beforeEach(function() {
      campaigns.findByUids.mockClear();
      totalCalories = <TotalCalories campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(totalCalories);
    });

    it('handles a sinlge campaign uid', function() {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1);
      expect(campaigns.findByUids).toBeCalledWith(["us-22"], element.onSuccess);
    });
  });

  describe('Custom component props', function() {
    var totalCalories;
    var element;
    var translation = {
      title: 'Ground Covered'
    };

    beforeEach(function() {
      totalCalories = <TotalCalories i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalCalories);
      element.setState({
        isLoading: false,
        total: 1000
      });
    });

    it('renders a custom title', function() {
      var title = findByClass(element, 'TotalCalories__title');
      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders no icon', function() {
      expect(element.renderIcon()).toBeUndefined();
    });
  });

  describe('Number formatting options', function() {
    it('renders in a human readable format by default', function() {
      var totalCalories = <TotalCalories campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalCalories);

      element.setState({
        isLoading: false,
        total: 1000050
      });

      var total = findByClass(element, 'TotalCalories__total');
      expect(total.getDOMNode().textContent).toBe('1,000,050');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalCalories = <TotalCalories campaignUid="au-0" format="0.00" />;
      var element = TestUtils.renderIntoDocument(totalCalories);

      element.setState({
        isLoading: false,
        total: 1000050
      });

      var total = findByClass(element, 'TotalCalories__total');
      expect(total.getDOMNode().textContent).toBe('1000050.00');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var totalCalories = <TotalCalories campaignUid="au-0" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(totalCalories);
      var icon = scryByClass(element, 'TotalCalories__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var totalCalories = <TotalCalories campaignUid="au-0" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(totalCalories);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });
});
