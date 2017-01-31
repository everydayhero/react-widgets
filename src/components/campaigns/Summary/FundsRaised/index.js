import React from 'react'
import numbro from 'numbro'
import Stat from '../Stat'

const FundsRaised = ({ loading, fundsRaised, numberFormat }) => {
  const { currency, amount } = fundsRaised

  if (!amount || !currency) return <span />
  const fundsRaisedFormatted = numbro(amount).format(currency + numberFormat)

  return (
    <Stat
      loading={loading}
      number={fundsRaisedFormatted}
      label='raised' />
  )
}

FundsRaised.displayName = 'CampaignSummaryFundsRaied'

FundsRaised.propTypes = {
  fundsRaised: React.PropTypes.object,
  numberFormat: React.PropTypes.string,
  loading: React.PropTypes.bool
}

export default FundsRaised

