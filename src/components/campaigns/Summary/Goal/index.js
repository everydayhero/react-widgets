import React from 'react'
import numbro from 'numbro'
import Stat from '../Stat'

const Goal = ({ loading, goal, currencySymbol, numberFormat }) => {
  const formattedGoal = numbro(goal).format(currencySymbol + numberFormat)

  return (
    <Stat
      type='alt'
      loading={loading}
      number={formattedGoal}
      label='Goal' />
  )
}

Goal.displayName = 'CampaignSummaryGoal'

Goal.propTypes = {
  goal: React.PropTypes.number.isRequired,
  currencySymbol: React.PropTypes.string,
  numberFormat: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default Goal
