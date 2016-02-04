"use strict";
jest.autoMockOff();

describe('TeamLeaderboardItem', function() {
  var React               = require('react');
  var TeamLeaderboardItem = require('../');
  var TestUtils           = require('react-addons-test-utils');
  var findByClass         = TestUtils.findRenderedDOMComponentWithClass;

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

    it('renders a team image', function() {
      var elementImg = findByClass(element, 'TeamLeaderboard__items-image');
      expect(elementImg).not.toBeNull();
    });

    it('renders a team name', function() {
      var elementName = findByClass(element, 'TeamLeaderboard__items-name');
      expect(elementName).not.toBeNull();
    });
  });

  describe('Render charity name option', function() {
    var element;
    var elementCharity;

    it('renders a charity name if present', function() {
      teamLeaderboardItem = <TeamLeaderboardItem charityName='foo' />;
      element = TestUtils.renderIntoDocument(teamLeaderboardItem);
      elementCharity = findByClass(element, 'LeaderboardItem__charity');
      expect(elementCharity).not.toBeNull();
      expect(elementCharity.getDOMNode().textContent).toEqual('foo');
    });
  });
});
