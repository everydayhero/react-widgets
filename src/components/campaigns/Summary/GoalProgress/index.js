import React from 'react'

const GoalProgress = ({ goal = 0, fundsRaisedAmount = 0 }) => {
  if (!goal) return <span />
  const progressPercentage = Math.min(fundsRaisedAmount / goal, 1) * 100
  return (
    <div className='CampaignSummaryProgressBar'>
      <div
        style={{width: `${progressPercentage}%`}}
        className='CampaignSummaryProgressBar__progress' />
    </div>
  )
}

GoalProgress.displayName = 'CampaignSummaryNumberOfDonations'

GoalProgress.propTypes = {
  goal: React.PropTypes.number,
  fundsRaisedAmount: React.PropTypes.number
}

export default GoalProgress

