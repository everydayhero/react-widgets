/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('TotalDistance', function() {
  var React                       = require('react/addons');
  var TotalDistance               = require('../');
  var campaigns                   = require('../../../../api/campaigns');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
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

      expect(icon).not.toBeNull;
    });

    it('renders a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'TotalDistance__loading');
    });

    it('handles a campaign id', function() {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalDistance;
    var element;
    var translation = {
      title: 'Hours'
    }

    beforeEach(function() {
      totalDistance = <TotalDistance i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalDistance);
    });

    it('renders a custom title', function() {
      element.setState({
        isLoading: false,
        hasResults: true
      });
      var title = findByClass(element, 'TotalDistance__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });
  });
});
