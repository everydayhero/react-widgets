/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TeamLeaderboard', function() {
  var React                       = require('react/addons');
  var TeamLeaderboard             = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var teamLeaderboard;
    var element;

    beforeEach(function() {
      teamLeaderboard = <TeamLeaderboard campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(teamLeaderboard);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
