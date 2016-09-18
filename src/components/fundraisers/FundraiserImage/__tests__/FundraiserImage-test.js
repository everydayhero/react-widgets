jest.disableAutomock();

import React from 'react';
import FundraiserImage from '../';
import TestUtils from 'react-addons-test-utils';

describe('FundraiserImage', function() {
  let findByTag = TestUtils.findRenderedDOMComponentWithTag;

  describe('component defaults', function() {
    let fundraiserImage;
    let element;

    beforeEach(function() {
      fundraiserImage = <FundraiserImage />;
      element = TestUtils.renderIntoDocument(fundraiserImage);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });

  describe('component with custom props', function() {
    let fundraiserImage;
    let element;
    let props = {
      pageUrl: "http://everydayhero.com/us",
      imgTitle: "Wonderful Person"
    };

    beforeEach(function() {
      fundraiserImage = <FundraiserImage imgTitle={ props.imgTitle }  pageUrl={ props.pageUrl } />;
      element = TestUtils.renderIntoDocument(fundraiserImage);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an anchor with custom url and title prop', function() {
      let anchor = findByTag(element, 'a');
      expect(anchor.href).toBe(props.pageUrl);
    });

    it('renders an image with alt tag including custom title prop', function() {
      let image = findByTag(element, 'img');
      expect(image.alt).toBe(props.imgTitle);
    });
  });
});
