import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'

import CampaignSummary from '../'
import GoalProgress from '../GoalProgress'
import NumberOfDonations from '../NumberOfDonations'
import FundsRaised from '../FundsRaised'
import TimeToGive from '../TimeToGive'
import Goal from '../Goal'
import campaigns from '../../../../api/campaigns'
import totals from '../../../../api/totals'

describe('CampaignSummary', () => {
  describe('campaign summary', () => {
    const campaignsResult = {
      campaign: {
        finish_at: '2019-02-15T00:00:00.000+00:00',
        display_finish_at: '2019-02-13T00:00:00.000+00:00',
        funds_raised: {
          cents: 987654321,
          currency: {symbol: 'R'}
        }
      }
    }
    const totalsResult = {
      types: {
        magpies: { doc_count: 1000 },
        brush_turkeys: { doc_count: 2000 },
        magpie_larks: { doc_count: 3000 }
      }
    }

    before(() => {
      sinon.stub(campaigns, 'find', (uid, callback) => { callback(campaignsResult) })
      sinon.stub(totals, 'findByCampaigns', (args, callback) => { callback(totalsResult) })
    })

    afterEach(() => {
      campaigns.find.reset()
      totals.findByCampaigns.reset()
    })

    after(() => {
      campaigns.find.restore()
      totals.findByCampaigns.restore()
    })

    describe('campaign information', () => {
      it('retrieves campaign information', () => {
        mount(<CampaignSummary campaignUid='au-123' />)
        expect(campaigns.find.calledOnce).to.equal(true)
        campaigns.find.should.have.been.calledWith('au-123')
      })

      it('transforms result and updates state', () => {
        const element = mount(<CampaignSummary campaignUid='au-123' />)
        const state = element.state()
        expect(state.fundsRaised.amount).to.equal(9876543)
        expect(state.fundsRaised.currency).to.equal('R')
        expect(
          state.donationEndTime.toString()
        ).to.equal(moment('2019-02-13T00:00:00.000+00:00').toString())
      })
    })

    describe('totals information', () => {
      it('retrieves totals information', () => {
        mount(<CampaignSummary campaignUid='au-123' />)
        expect(campaigns.find.calledOnce).to.equal(true)
        totals.findByCampaigns.should.have.been.calledWith({campaignUids: ['au-123']})
      })

      it('transforms result and updates state', () => {
        const element = mount(<CampaignSummary campaignUid='au-123' />)
        expect(element.state().numberOfDonations).to.equal(6000)
      })
    })

    describe('child components', () => {
      it('renders the GoalProgress component with expected props', () => {
        const wrapper = mount(<CampaignSummary goal={666000666} campaignUid='au-123' />)
        const props = wrapper.find(GoalProgress).first().props()
        expect(props.goal).to.equal(666000666)
        expect(props.fundsRaisedAmount).to.equal(9876543)
      })

      describe('NumberOfDonations', () => {
        it('renders the NumberOfDonations components with expected props', () => {
          const wrapper = mount(<CampaignSummary campaignUid='au-123' />)
          const props = wrapper.find(NumberOfDonations).first().props()
          expect(props.total).to.equal(6000)
          expect(props.numberFormat).to.equal('0,0')
          expect(props.loading).to.equal(false)
        })

        it('renders NumberOfDonations components with different numberFormats', () => {
          const wrapper = mount(<CampaignSummary campaignUid='au-123' />)
          const components = wrapper.find(NumberOfDonations)
          expect(components.at(0).text()).to.equal('6,000 donations')
          expect(components.at(1).text()).to.equal('6k donations')
        })
      })

      describe('FundsRaised', () => {
        it('renders the FundsRaised components with expected props', () => {
          const wrapper = mount(<CampaignSummary campaignUid='au-123' />)
          const props = wrapper.find(FundsRaised).first().props()
          expect(props.fundsRaised.amount).to.equal(9876543)
          expect(props.fundsRaised.currency).to.equal('R')
          expect(props.numberFormat).to.equal('0,0')
          expect(props.loading).to.equal(false)
        })

        it('renders FundsRaised components with different numberFormats', () => {
          const wrapper = mount(<CampaignSummary campaignUid='au-123' />)
          const components = wrapper.find(FundsRaised)
          expect(components.at(0).text()).to.equal('R9,876,543 raised')
          expect(components.at(1).text()).to.equal('R9.9m raised')
        })
      })

      it('renders the TimeToGive components with expected props', () => {
        const wrapper = mount(<CampaignSummary campaignUid='au-123' />)
        const props = wrapper.find(TimeToGive).first().props()
        expect(
          props.donationEndTime.toString()
        ).to.equal(
          moment('2019-02-13T00:00:00.000+00:00').toString()
        )
      })

      describe('Goal', () => {
        it('renders the Goal components with expected props', () => {
          const wrapper = mount(<CampaignSummary goal={666000} campaignUid='au-123' />)
          const props = wrapper.find(Goal).first().props()
          expect(props.goal).to.equal(666000)
          expect(props.currencySymbol).to.equal('R')
          expect(props.numberFormat).to.equal('0,0')
          expect(props.loading).to.equal(false)
        })

        it('renders Goal components with different numberFormats', () => {
          const wrapper = mount(<CampaignSummary goal={666000}campaignUid='au-123' />)
          const components = wrapper.find(Goal)
          expect(components.at(0).text()).to.equal('R666,000 Goal')
          expect(components.at(1).text()).to.equal('R666k Goal')
        })
      })
    })
  })
})
