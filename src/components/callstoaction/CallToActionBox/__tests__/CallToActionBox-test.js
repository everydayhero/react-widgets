/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('CallToActionBox', function() {
  var React                       = require('react/addons');
  var CallToActionBox             = require('../');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var callToActionBox;
    var element;

    beforeEach(function() {
      callToActionBox = <CallToActionBox campaignUid="au-0" registrationUrl="http://google.com.au/" />;
      element = TestUtils.renderIntoDocument(callToActionBox);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
