import React from 'react'
import numbro from 'numbro'
import Stat from '../Stat'

const NumberOfDonations = ({ loading, total, numberFormat }) => {
  return (
    <Stat
      loading={loading}
      number={numbro(total).format(numberFormat)}
      label='donations' />
  )
}

NumberOfDonations.displayName = 'CampaignSummaryNumberOfDonations'

NumberOfDonations.propTypes = {
  total: React.PropTypes.number,
  numberFormat: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default NumberOfDonations

