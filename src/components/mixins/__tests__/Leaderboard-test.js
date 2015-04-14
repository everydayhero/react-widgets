"use strict";
jest.autoMockOff();

describe('LeaderboardMixin', function() {
  var _                 = require('lodash');
  var React             = require('react/addons');
  var Leaderboard       = require('../Leaderboard');
  var TestUtils         = React.addons.TestUtils;
  var findByClass       = TestUtils.findRenderedDOMComponentWithClass;

  describe('getLeaderboard', function() {
    it('should remove pages with amount equals 0', function() {
      var pages = [
        {
          id: 1,
          name: 'name',
          url: '',
          amount: {
            cents: 99,
            currency: {}
          },
          team_member_uids: {},
          image: {
            large_image_url: '',
            medium_image_url: ''
          }
        },
        { amount: { cents: 0 } }
      ]
      var leaderboard = Leaderboard.getLeaderboard(pages);

      expect(leaderboard.length).toEqual(1);
      expect(leaderboard[0].amount).toEqual(99);
    });
  });
});
