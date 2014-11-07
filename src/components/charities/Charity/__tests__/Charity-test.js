/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

describe('Charity', function() {
  var React       = require('react/addons');
  var Charity     = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var charity;
    var element;

    beforeEach(function() {
      charity = <Charity campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(charity);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
