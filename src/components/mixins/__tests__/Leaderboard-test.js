jest.disableAutomock()

import Leaderboard from '../Leaderboard'

describe('LeaderboardMixin', function () {
  describe('getLeaderboard', function () {
    it('should remove pages with amount equals 0', function () {
      let pages = [
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
      let leaderboard = Leaderboard.getLeaderboard(pages)

      expect(leaderboard.length).toEqual(1)
      expect(leaderboard[0].amount).toEqual(99)
    })
  })
})
