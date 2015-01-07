"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('Leaderboard', function() {
  var _               = require('lodash');
  var React           = require('react/addons');
  var Leaderboard     = require('../');
  var LeaderboardItem = require('../../LeaderboardItem/');
  var pages           = require('../../../../api/pages');
  var TestUtils       = React.addons.TestUtils;
  var findByClass     = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass     = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var leaderboard;
    var element;

    beforeEach(function() {
      leaderboard = <Leaderboard campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default heading', function() {
      var heading = findByClass(element, 'Leaderboard__heading');

      expect(heading.getDOMNode().textContent).toBe('Leaderboard > Top Individuals');
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'Leaderboard__loading');
    });
  });

  describe('Custom component props', function() {
    var leaderboard;
    var element;
    var translation = {
      heading: 'Top Teams'
    };

    beforeEach(function() {
      leaderboard = <Leaderboard campaignUid="au-0" i18n={ translation } type="team" />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders a custom heading', function() {
      var heading = findByClass(element, 'Leaderboard__heading');
      expect(heading.getDOMNode().textContent).toBe(translation.heading);
    });
  });

  describe('standard competition ranking system', function() {
    var element;
    var data;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Leaderboard />);
    });

    it('assigns rank in order of amount', function(){
      data = [
        { id: 1, amount: 1100 },
        { id: 2, amount: 1000 },
        { id: 3, amount: 900 }
      ];

      element.rankLeaderboard(data);
      expect(_.pluck(data, 'rank')).toEqual([1, 2, 3]);
    });

    it('gives results with the same amount the same rank', function() {
      data = [
        { id: 1, amount: 1000 },
        { id: 2, amount: 1000 }
      ];

      element.rankLeaderboard(data);
      expect(_.pluck(data, 'rank')).toEqual([1, 1]);
    });

    it('leaves a gap to compensate for items with the same rank', function(){
      data = [
        { id: 1, amount: 1100 },
        { id: 2, amount: 1000 },
        { id: 3, amount: 1000 },
        { id: 4, amount: 1000 },
        { id: 5, amount: 900 }
      ];

      element.rankLeaderboard(data);
      expect(_.pluck(data, 'rank')).toEqual([1, 2, 2, 2, 5]);
    });
  });

  describe('Number formatting options', function() {
    it('renders in a short format by default', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(10000)).toEqual('$100 ');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" format="0.00" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(10000)).toEqual('$100.00');
    });
  });
});
