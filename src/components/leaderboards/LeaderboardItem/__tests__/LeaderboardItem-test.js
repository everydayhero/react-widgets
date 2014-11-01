/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

describe('LeaderboardItem', function() {
  var React                       = require('react/addons');
  var LeaderboardItem             = require('../');
  var TestUtils                   = React.addons.TestUtils;

  describe('component defaults', function() {
    var leaderboardItem;
    var element;

    beforeEach(function() {
      leaderboardItem = <LeaderboardItem campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
