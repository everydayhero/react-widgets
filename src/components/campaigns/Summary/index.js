import React from 'react'
import moment from 'moment'
import TimeToGive from './TimeToGive'
import FundsRaised from './FundsRaised'
import NumberOfDonations from './NumberOfDonations'
import Goal from './Goal'
import GoalProgress from './GoalProgress'
import totals from '../../../api/totals'
import campaigns from '../../../api/campaigns'

class CampaignSummary extends React.Component {

  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.loadCampaign = this.loadCampaign.bind(this)
    this.loadTotals = this.loadTotals.bind(this)
    this.onSuccessCampaign = this.onSuccessCampaign.bind(this)
    this.onSuccessTotals = this.onSuccessTotals.bind(this)
    this.renderStats = this.renderStats.bind(this)

    this.state = {
      loadingCampaign: false,
      loadingTotals: false,
      fundsRaised: {}
    }
  }

  componentWillMount () {
    this.loadCampaign()
    this.loadTotals()
  }

  loadCampaign () {
    const { campaignUid } = this.props
    this.setState({loadingCampaign: true})
    campaigns.find(campaignUid, this.onSuccessCampaign)
  }

  loadTotals () {
    const { campaignUid } = this.props
    this.setState({loadingTotals: true})
    totals.findByCampaigns(
      {
        campaignUids: [campaignUid]
      },
      this.onSuccessTotals
    )
  }

  onSuccessCampaign (result) {
    const campaign = result.campaign
    const resultsFunds = campaign.funds_raised
    const fundsRaised = {
      amount: Math.round(resultsFunds.cents / 100),
      currency: resultsFunds.currency.symbol
    }
    this.setState({
      fundsRaised,
      loadingCampaign: false,
      donationEndTime: moment(campaign.finish_at)
    })
  }

  onSuccessTotals (result) {
    const donationsByType = result.types
    const numberOfDonations = Object.keys(donationsByType).reduce((tally, donationType) => {
      return tally + donationsByType[donationType].doc_count
    }, 0)
    this.setState({
      numberOfDonations,
      loadingTotals: false
    })
  }

  renderStats ({size, state}) {
    const {
      donationEndTime,
      fundsRaised,
      numberOfDonations,
      loadingCampaign,
      loadingTotals
    } = this.state
    const { numberFormats, goal } = this.props
    const numberFormat = numberFormats[size]

    return (
      <div className={`CampaignSummary__stats CampaignSummary__stats--${size}`} key={size}>
        <FundsRaised
          loading={loadingCampaign}
          fundsRaised={fundsRaised}
          numberFormat={numberFormat} />
        <NumberOfDonations
          loading={loadingTotals}
          total={numberOfDonations}
          numberFormat={numberFormat} />
        { donationEndTime && <TimeToGive
          donationEndTime={donationEndTime} /> }
        { goal && <Goal
          loading={loadingCampaign}
          currencySymbol={fundsRaised.currency}
          goal={goal}
          numberFormat={numberFormat} /> }
      </div>
    )
  }

  render () {
    const { goal } = this.props
    const fundsRaisedAmount = this.state.fundsRaised.amount

    return (
      <div key='campaignSummary' className='CampaignSummery'>
        <GoalProgress
          goal={goal}
          fundsRaisedAmount={fundsRaisedAmount} />
        { this.renderStats({size: 'normal'}) }
        { this.renderStats({size: 'small'}) }
      </div>
    )
  }
}

CampaignSummary.displayName = 'CampaignSummary'

CampaignSummary.propTypes = {
  goal: React.PropTypes.number,
  campaignUid: React.PropTypes.string.isRequired,
  numberFormats: React.PropTypes.object
}

CampaignSummary.defaultProps = {
  numberFormats: {
    small: '0a[.]0',
    normal: '0,0'
  }
}

export default CampaignSummary
