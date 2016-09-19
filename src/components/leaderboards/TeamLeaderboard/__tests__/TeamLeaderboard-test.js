jest.disableAutomock();

import _ from 'lodash';
import React from 'react';
import TeamLeaderboard from '../';
import TestUtils from 'react-addons-test-utils';

describe('TeamLeaderboard', function() {
  let findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('Component defaults', function() {
    var teamLeaderboard;
    var element;

    beforeEach(function() {
      teamLeaderboard = <TeamLeaderboard campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(teamLeaderboard);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default heading', function() {
      var heading = findByClass(element, 'TeamLeaderboard__heading');
      expect(heading.textContent).toBe('Top Teams');
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TeamLeaderboard__loading');
    });
  });

  describe('Custom component props', function() {
    var leaderboard;
    var element;
    var translation = {
      heading: 'Top Teams'
    };

    beforeEach(function() {
      leaderboard = <TeamLeaderboard campaignUid="au-0" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders a custom heading', function() {
      var heading = findByClass(element, 'TeamLeaderboard__heading');
      expect(heading.textContent).toBe(translation.heading);
    });
  });

  describe('standard competition ranking system', function() {
    var element;
    var data;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<TeamLeaderboard campaignUid="au-0" />);
    });

    it('assigns rank in order of amount', function(){
      data = [
        { id: 1, amount: 1100 },
        { id: 2, amount: 1000 },
        { id: 3, amount: 900 }
      ];

      element.rankLeaderboard(data);
      expect(_.map(data, 'rank')).toEqual([1, 2, 3]);
    });

    it('gives results with the same amount the same rank', function() {
      data = [
        { id: 1, amount: 1000 },
        { id: 2, amount: 1000 }
      ];

      element.rankLeaderboard(data);
      expect(_.map(data, 'rank')).toEqual([1, 1]);
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
      expect(_.map(data, 'rank')).toEqual([1, 2, 2, 2, 5]);
    });
  });

  describe('Number formatting options', function() {
    it('renders in a abbreviated format by default', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(100000)).toEqual('$1 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" currencyFormat="0.00" />;
      var element = TestUtils.renderIntoDocument(leaderboard);

      expect(element.formatAmount(100000)).toEqual('$1000.00');
    });
  });

  describe('rendering different templates', function(){
    it('renders LeaderboardItem component for children by default', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      expect(element.props.altTemplate).toBeFalsy();
    });

    it('renders TeamLeaderboardItem component for children when set', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" altTemplate />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      expect(element.props.altTemplate).toBeTruthy();
    });
  });

  describe('paging button rendering', function() {
    it('renders a paging component if multiple pages are available', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" limit={ 10 } pageSize={ 5 } />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      element.setState({
        isLoading: false,
        resultCount: 10
      });

      var pagingFunction = element.renderPaging();
      expect(pagingFunction).toBeDefined();
    });

    it('does not render a paging component if only 1 page is available', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" limit={ 5 } pageSize={ 5 } />;
      var element = TestUtils.renderIntoDocument(leaderboard);
      element.setState({ isLoading: false });

      var pagingFunction = element.renderPaging();
      expect(pagingFunction).toBeUndefined();
    });
  });

  describe('handleHasContentCallback', function() {
    var element;
    var onHasContent = jasmine.createSpy();
    var board = [1];

    describe('callback is not passed in', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" />;
      beforeEach(function() {
        element = TestUtils.renderIntoDocument(leaderboard);
      });

      it('should not be called', function() {
        element.handleHasContentCallback(board);
        expect(onHasContent).not.toHaveBeenCalled();
      });
    });

    describe('callback is passed in', function() {
      var leaderboard = <TeamLeaderboard campaignUid="au-0" onHasContent={ onHasContent } />;
      beforeEach(function() {
        element = TestUtils.renderIntoDocument(leaderboard);
      });

      it('should not be called when leaderboard is empty', function() {
        element.handleHasContentCallback([]);
        expect(onHasContent).not.toHaveBeenCalled();
      });

      it('should be called when leaderboard is not empty', function() {
        element.handleHasContentCallback(board);
        expect(onHasContent).toHaveBeenCalled();
      });
    });
  });
});
