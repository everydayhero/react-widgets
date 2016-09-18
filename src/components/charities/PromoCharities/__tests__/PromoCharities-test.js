jest.disableAutomock();
jest.mock('../../../../api/charities');

import React from 'react';
import PromoCharities from '../';
import TestUtils from 'react-addons-test-utils';

describe('PromoCharities', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('default behaviour for PromoCharities', function() {
    var promoCharities;
    var element;
    var tabsData = [{ category: 'Tab One', charityUids: ['au-1'] }];

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

      expect(heading.textContent).toBe(translation.heading);
      expect(subHeading.textContent).toBe(translation.subheading);
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
      element.setState({ isLoading: false });
      var heading = findByClass(element, 'PromoCharities__heading');
      var subHeading  = findByClass(element, 'PromoCharities__subheading');

      expect(heading.textContent).toBe(translation.heading);
      expect(subHeading.textContent).toBe(translation.subheading);
    });
  });

  describe('Order of rendered items matches order of supplied uids', function() {
    var promoCharities;
    var element;
    var tabsData = [{ category: 'Tab One', charityUids: ['au-1','au-2','au-3'] }];
    var keys = tabsData[0].charityUids;

    var charities = [
      { name: 'charity3', id: 'au-3' },
      { name: 'charity1', id: 'au-1' },
      { name: 'charity2', id: 'au-2' }
    ];

    beforeEach(function() {
      promoCharities = <PromoCharities action="fundraise" tabs={ tabsData } />;
      element = TestUtils.renderIntoDocument(promoCharities);
    });

    it('re-orders an array of charities to match the order of uids passed in', function() {
      var reordered = [
        { name: 'charity1', id: 'au-1' },
        { name: 'charity2', id: 'au-2' },
        { name: 'charity3', id: 'au-3' }
      ];

      expect(element.orderCharities(charities, keys)).toEqual(reordered);
    });
  });
});
