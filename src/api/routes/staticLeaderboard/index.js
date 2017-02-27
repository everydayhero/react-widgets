import routes from '..'
import pages from '../pages'
import leaderboardHelpers from '../../../components/mixins/Leaderboard'

const staticLeaderboard = ({
  id
}) => (
  routes.client(`api/v2/leaderboards/${id}.json`)
  .then(({ data }) => (
    data.leaderboard.page_ids
  )).then((ids) => (
    pages({ids})
  )).then((pages) => (
    // Because the pages endpoint doesn't keep the order
    pages.sort((a, b) => (
      b.amount - a.amount
    ))
  )).then((pages) => leaderboardHelpers.rankLeaderboard(pages))
)

export default staticLeaderboard
