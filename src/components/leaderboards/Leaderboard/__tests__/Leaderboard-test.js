"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('Leaderboard', function() {
  var _                 = require('lodash');
  var React             = require('react/addons');
  var Leaderboard       = require('../');
  var LeaderboardItem   = require('../../LeaderboardItem/');
  var LeaderboardPaging = require('../../LeaderboardPaging/');
  var TestUtils         = React.addons.TestUtils;
  var findByClass       = TestUtils.findRenderedDOMComponentWithClass;

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

      expect(heading.getDOMNode().textContent).toBe('Top Individuals');
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
      leaderboard = <Leaderboard campaignUid="au-0" i18n={ translation } />;
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
      element = TestUtils.renderIntoDocument(<Leaderboard campaignUid="au-0" />);
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
    it('renders in a long format with commas by default', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(100000)).toEqual('$1,000');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" currencyFormat="0.00" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(10000)).toEqual('$100.00');
    });
  });

  describe('paging button rendering', function() {
    it('renders a paging component if multiple pages are available', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" limit={ 10 } pageSize={ 5 } />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      element.setState({ isLoading: false });

      var paging = <LeaderboardPaging />;
      var pagingFunction = element.renderPaging();
      expect(pagingFunction).toBeDefined();
    });

    it('does not render a paging component if only 1 page is available', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" limit={ 5 } pageSize={ 5 } />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      element.setState({ isLoading: false });

      var paging = <LeaderboardPaging />;
      var pagingFunction = element.renderPaging();
      expect(pagingFunction).toBeUndefined();
    });
  });

  describe('onHasContent callback', function() {
    var element;
    var onHasContent = jasmine.createSpy();
    var result = {
      leaderboard: {
        pages: [
          {
            id: 1,
            name: 'page1',
            url: 'url',
            amount: {
              currency: {},
              cents: 100
            },
            team_member_uids: {},
            image: {}
          }
        ]
      }
    };

    describe('is not passed in', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" />;
      beforeEach(function() {
        element = TestUtils.renderIntoDocument(leaderboard);
      });

      it('should not call onHasContent', function() {
        element.processLeaderboard();
        expect(onHasContent).not.toHaveBeenCalled();
      });
    });

    describe('is passed in', function() {
      var leaderboard = <Leaderboard campaignUid="au-0" onHasContent={ onHasContent } />;
      beforeEach(function() {
        element = TestUtils.renderIntoDocument(leaderboard);
      });

      it('should not call onHasContent when there is no page', function() {
        element.processLeaderboard();
        expect(onHasContent).not.toHaveBeenCalled();
      });

      it('should call onHasContent when there are pages', function() {
        element.processLeaderboard(result);
        expect(onHasContent).toHaveBeenCalled();
      });
    });
  });
});
