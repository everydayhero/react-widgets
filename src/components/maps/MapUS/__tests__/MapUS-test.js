/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('MapUS', function() {
  var React                       = require('react/addons');
  var MapUS                       = require('../');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var mapUS;
    var element;

    beforeEach(function() {
      mapUS = <MapUS campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(mapUS);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
