"use strict";
jest.autoMockOff();

describe('TeamLeaderboardItem', function() {
  var React                       = require('react/addons');
  var TeamLeaderboardItem         = require('../');
  var TestUtils                   = React.addons.TestUtils;

  describe('component defaults', function() {
    var teamLeaderboardItem;
    var element;

    beforeEach(function() {
      teamLeaderboardItem = <TeamLeaderboardItem campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(teamLeaderboardItem);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
