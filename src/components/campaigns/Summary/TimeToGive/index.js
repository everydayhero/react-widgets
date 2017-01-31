import React from 'react'
import moment from 'moment'
import Stat from '../Stat'

const remainingtTimeToGive = function (donationEndTime, unit) {
  return donationEndTime.diff(moment(), unit)
}

const TimeToGive = ({ donationEndTime }) => {
  if (remainingtTimeToGive(donationEndTime) <= 0) return <span />
  const daysLeft = remainingtTimeToGive(donationEndTime, 'days')
  const plural = daysLeft > 1
  return (
    <Stat
      number={daysLeft === 0 ? 'less than 1' : daysLeft}
      label={`${plural ? 'days' : 'day'} to give`} />
  )
}

TimeToGive.displayName = 'CampaignSummaryTimeToGive'

TimeToGive.propTypes = {
  donationEndTime: React.PropTypes.object.isRequired
}

export default TimeToGive
