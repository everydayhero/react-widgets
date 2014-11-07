/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('Charities', function() {
  var React       = require('react/addons');
  var Charities   = require('../');
  var endPoint    = require('../../../../api/charities');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var charities;
    var element;

    beforeEach(function() {
      charities = <Charities charityUids={['au-3395','au-31','au-494', 'au-11', 'au-3982', 'au-1558']} />;
      element = TestUtils.renderIntoDocument(charities);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
