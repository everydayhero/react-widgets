import React from 'react'
import numbro from 'numbro'
import Stat from '../Stat'

const NumberOfDonations = ({ loading, total, numberFormat }) => {
  const plural = total !== 1 ? 's' : ''
  return (
    <Stat
      loading={loading}
      number={numbro(total).format(numberFormat)}
      label={`donation${plural}`} />
  )
}

NumberOfDonations.displayName = 'CampaignSummaryNumberOfDonations'

NumberOfDonations.propTypes = {
  total: React.PropTypes.number,
  numberFormat: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default NumberOfDonations

