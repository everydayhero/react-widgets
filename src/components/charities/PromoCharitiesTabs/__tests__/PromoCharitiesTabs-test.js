/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('PromoCharitiesTabs', function() {
  var React              = require('react/addons');
  var PromoCharitiesTabs = require('../');
  var charities          = require('../../../../api/charities');
  var TestUtils          = React.addons.TestUtils;
  var findByClass        = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass        = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('PromoCharitiesTabs', function() {
    var promoCharitiesTabs;
    var element;
    var charityData = {
      category:     'test category',
      id:           'au-3',
      name:         'test charity',
      description:  'test description',
      url:          'http://everydayhero.com/us',
      logo_url:     'http://placehold.it/100x100',
      slug:         'test-slug',
      country_code: 'au'
    };

    var tabsData = [{tabName: 'Tab One', contents: [charityData]}, {tabName: 'Tab Two', contents: [charityData]}];

    beforeEach(function() {
      promoCharitiesTabs = <PromoCharitiesTabs data={ tabsData } />;
      element = TestUtils.renderIntoDocument(promoCharitiesTabs);
    });

    it('renders all the tabs', function() {
      var tabsContainer = findByClass(element, 'PromoCharitiesTabs');
      var tabsElements = scryByClass(element, 'PromoCharitiesTab');

      expect(tabsContainer).toBeDefined();
      expect(tabsElements.length).toBe(tabsData.length);
    });
  });
});
