"use strict";
jest.autoMockOff();

describe('FundraiserImage', function() {
  var React                       = require('react/addons');
  var FundraiserImage             = require('../');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var fundraiserImage;
    var element;

    beforeEach(function() {
      fundraiserImage = <FundraiserImage campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(fundraiserImage);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
