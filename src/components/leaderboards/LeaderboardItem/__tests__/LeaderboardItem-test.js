"use strict";
jest.autoMockOff();

describe('LeaderboardItem', function() {
  var React                       = require('react/addons');
  var LeaderboardItem             = require('../');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

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

    it('renders a profile image', function() {
      var elementImg = findByClass(element, 'LeaderboardItem__image');
      expect(elementImg).not.toBeNull();
    });
  });
});
