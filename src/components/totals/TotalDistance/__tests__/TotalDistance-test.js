"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('TotalDistance', function() {
  var React         = require('react/addons');
  var TotalDistance = require('../');
  var campaigns     = require('../../../../api/campaigns');
  var TestUtils     = React.addons.TestUtils;
  var scryByClass   = TestUtils.scryRenderedDOMComponentsWithClass;
  var findByClass   = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var totalDistance;
    var element;

    beforeEach(function() {
      campaigns.find.mockClear();
      totalDistance = <TotalDistance campaignUid="us-22" />;
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

    it('handles a single campaign id', function() {
      expect(campaigns.find.mock.calls.length).toEqual(1);
      expect(campaigns.find).toBeCalledWith("us-22", element.onSuccess);
    });
  });

  describe('working with multiple uids', function() {
    var totalDistance;
    var element;

    beforeEach(function() {
      campaigns.find.mockClear();
      totalDistance = <TotalDistance campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('handles a multiple campaign ids', function() {
      expect(campaigns.findByUids.mock.calls.length).toEqual(1);
      expect(campaigns.findByUids).toBeCalledWith(["us-22", "us-24"], element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalDistance;
    var element;
    var translation = {
      title: 'Hours'
    };

    beforeEach(function() {
      totalDistance = <TotalDistance i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('renders a custom title', function() {
      element.setState({
        isLoading: false,
        total: 123
      });
      var title = findByClass(element, 'TotalDistance__title');
      expect(title.getDOMNode().textContent).toBe(translation.title);
    });
  });
});
