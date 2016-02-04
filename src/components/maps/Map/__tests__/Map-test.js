"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('Map', function() {
  var React                       = require('react');
  var Map                       = require('../');
  var TestUtils                   = require('react-addons-test-utils');
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var map;
    var element;

    beforeEach(function() {
      map = <Map campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(map);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
