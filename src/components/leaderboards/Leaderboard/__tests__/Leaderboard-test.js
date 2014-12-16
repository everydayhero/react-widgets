"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('Leaderboard', function() {
  var React           = require('react/addons');
  var Leaderboard     = require('../');
  var LeaderboardItem = require('../../LeaderboardItem/');
  var pages           = require('../../../../api/pages');
  var TestUtils       = React.addons.TestUtils;
  var findByClass     = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass     = TestUtils.scryRenderedDOMComponentsWithClass;

  var leaderboardResults = [
    {
      id: 123,
      name: "John Smith",
      url: "http://everydayhero.com.au",
      iso_code: "$",
      amount:  10000,
      amountFormatted: "$100.00",
      totalMembers: 10,
      imgSrc: "http://placehold.it/300x300",
      medImgSrc: "http://placehold.it/200x200"
    },
    {
      id: 124,
      name: "Jane Doe",
      url: "http://everydayhero.com.au",
      iso_code: "$",
      amount:  10000,
      amountFormatted: "$100.00",
      totalMembers: 20,
      imgSrc: "http://placehold.it/300x300",
      medImgSrc: "http://placehold.it/200x200"
    }
  ];

  describe('component defaults', function() {
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

  describe('component props', function() {
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
    beforeEach(function() {
      //
    });

    it('gives results with the same amount the same rank', function() {
      //
    });

    it('leaves a gap to compensate for items with the same rank', function(){
      //
    });

  });
});
