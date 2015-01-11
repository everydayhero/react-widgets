"use strict";
jest.autoMockOff();

describe('LeaderboardItem', function() {
  var React           = require('react/addons');
  var LeaderboardItem = require('../');
  var TestUtils       = React.addons.TestUtils;
  var findByClass     = TestUtils.findRenderedDOMComponentWithClass;

  describe('Component defaults', function() {
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

    it('renders funds raised', function() {
      var elementFunds = findByClass(element, 'LeaderboardItem__amount');
      expect(elementFunds).not.toBeNull();
    });

    it('renders a name', function() {
      var elementName = findByClass(element, 'LeaderboardItem__name');
      expect(elementName).not.toBeNull();
    });

    it('renders a rank', function() {
      var elementRank = findByClass(element, 'LeaderboardItem__rank');
      expect(elementRank).not.toBeNull();
    });
  });
});
