/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

describe('CallToActionButton', function() {
  var React                       = require('react/addons');
  var CallToActionButton          = require('../');
  var TestUtils                   = React.addons.TestUtils;

  describe('component defaults', function() {
    var callToActionButton;
    var element;

    beforeEach(function() {
      callToActionButton = <CallToActionButton btnUrl="http://everydayhero.com/us/" btnLabel="https://everydayhero.com/us/sign-in" />;
      element = TestUtils.renderIntoDocument(callToActionButton);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
