/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('TotalDistance', function() {
  var React                       = require('react/addons');
  var TotalHours               = require('../');
  var campaigns                   = require('../../../../api/campaigns');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var totalHours;
    var element;

    beforeEach(function() {
      totalHours = <TotalHours campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(totalHours);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalHours__icon');

      expect(icon).not.toBeNull;
    });

    it('renders a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'TotalHours__loading');
    });

    it('handles a campaign id', function() {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalHours;
    var element;
    var translation = {
      title: 'Kilometers'
    }

    beforeEach(function() {
      totalHours = <TotalHours i18n={ translation } renderIcon={ false } />;
      element = TestUtils.renderIntoDocument(totalHours);
    });

    it('renders a custom title', function() {
      element.setState({
        isLoading: false,
        hasResults: true
      });
      var title = findByClass(element, 'TotalHours__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });
  });
});