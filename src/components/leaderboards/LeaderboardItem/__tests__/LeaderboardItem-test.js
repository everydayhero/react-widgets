"use strict";
jest.autoMockOff();

describe('LeaderboardItem', function() {
  var React           = require('react/addons');
  var LeaderboardItem = require('../');
  var TestUtils       = React.addons.TestUtils;
  var findByClass     = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass     = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var leaderboardItem;
    var element;

    beforeEach(function() {
      leaderboardItem = <LeaderboardItem url="hello-world.com" />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('is a link', function() {
      var parentNode = element.getDOMNode();
      expect(parentNode.tagName).toBe('A');
      expect(parentNode.getAttribute('href')).toEqual('hello-world.com');
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

  describe('Render image option', function() {
    var leaderboardItem;
    var element;
    var elementImg;

    it('renders a profile image if set to true', function() {
      leaderboardItem = <LeaderboardItem renderImage={ true } />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementImg = scryByClass(element, 'LeaderboardItem__image');
      expect(elementImg.length).toEqual(1);
    });

    it('renders wont render an image if set to false', function() {
      leaderboardItem = <LeaderboardItem renderImage={ false } />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementImg = scryByClass(element, 'LeaderboardItem__image');
      expect(elementImg.length).toEqual(0);
    });
  });
});
