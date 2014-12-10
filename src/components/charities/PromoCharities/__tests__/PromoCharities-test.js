"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('PromoCharities', function() {
  var React          = require('react/addons');
  var PromoCharities = require('../');
  var charities      = require('../../../../api/charities');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('default behaviour for PromoCharities', function() {
    var promoCharities;
    var element;
    var tabsData = [{category: 'Tab One', charityUids: ['au-1']}];

    beforeEach(function() {
      promoCharities = <PromoCharities action="fundraise" tabs={ tabsData } />;
      element = TestUtils.renderIntoDocument(promoCharities);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default heading and subheading', function() {
      element.setState({ isLoading: false });
      var heading     = findByClass(element, 'PromoCharities__heading');
      var subHeading  = findByClass(element, 'PromoCharities__subheading');
      var translation = {
        heading: 'Promoted Charities',
        subheading: 'Choose a tab below to view promoted charities within each category.',
      };

      expect(heading.getDOMNode().textContent).toBe(translation.heading);
      expect(subHeading.getDOMNode().textContent).toBe(translation.subheading);
    });
  });

  describe('custom behaviour for PromoCharities', function() {
    var promoCharities;
    var element;
    var tabsData = [{category: 'Tab One', charityUids: ['au-1']}];
    var translation = {
      heading: 'Featured Charities',
      subheading: 'Pick a tab'
    };

    beforeEach(function() {
      promoCharities = <PromoCharities action="fundraise" tabs={ tabsData } i18n={ translation } />;
      element = TestUtils.renderIntoDocument(promoCharities);
    });

    it('renders a custom heading and subheading', function() {
      element.setState({isLoading: false});
      var heading = findByClass(element, 'PromoCharities__heading');
      var subHeading  = findByClass(element, 'PromoCharities__subheading');

      expect(heading.getDOMNode().textContent).toBe(translation.heading);
      expect(subHeading.getDOMNode().textContent).toBe(translation.subheading);
    });
  });
});
