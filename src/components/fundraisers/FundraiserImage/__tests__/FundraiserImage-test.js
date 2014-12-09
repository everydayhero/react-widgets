"use strict";
jest.autoMockOff();

describe('FundraiserImage', function() {
  var React           = require('react/addons');
  var FundraiserImage = require('../');
  var TestUtils       = React.addons.TestUtils;
  var findByTag       = TestUtils.findRenderedDOMComponentWithTag;

  describe('component defaults', function() {
    var fundraiserImage;
    var element;

    beforeEach(function() {
      fundraiserImage = <FundraiserImage />;
      element = TestUtils.renderIntoDocument(fundraiserImage);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });

  describe('component with custom props', function() {
    var fundraiserImage;
    var element;
    var props = {
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
      var anchor = findByTag(element, 'a').getDOMNode();
      expect(anchor.href).toBe(props.pageUrl);
    });

    it('renders an image with alt tag including custom title prop', function() {
      var image = findByTag(element, 'img').getDOMNode();
      expect(image.alt).toBe(props.imgTitle);
    });
  });
});
