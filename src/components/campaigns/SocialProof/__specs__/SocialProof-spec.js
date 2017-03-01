import React from 'react'
import { mount } from 'enzyme'

import CampaignSocialProof from '../'
import pages from '../../../../api/pages'
import totals from '../../../../api/totals'

describe('CampaignSocialProof', () => {
  describe('campaign summary', () => {
    const pagesResult = {
      meta: {
        count: 123
      },
      pages: [
        {
          owner_uid: 'owner-id-1',
          image: {
            medium_image_url: 'http://example.com/image1'
          }
        },
        {
          owner_uid: 'owner-id-2',
          image: {
            medium_image_url: 'http://example.com/image2'
          }
        },
        {
          owner_uid: 'owner-id-3',
          image: {
            medium_image_url: 'http://example.com/image3'
          }
        },
        {
          owner_uid: 'owner-id-4',
          image: {
            medium_image_url: 'http://example.com/image4'
          }
        },
        {
          owner_uid: 'owner-id-5',
          image: {
            medium_image_url: 'http://example.com/image5'
          }
        }
      ]
    }
    const totalsResult = {
      types: {
        magpies: { doc_count: 1000 },
        brush_turkeys: { doc_count: 2000 },
        magpie_larks: { doc_count: 3000 }
      }
    }

    before(() => {
      sinon.stub(pages, 'findByCampaign', (uid, type, count, page, callback) => { callback(pagesResult) })
      sinon.stub(totals, 'findByCampaigns', (args, callback) => { callback(totalsResult) })
    })

    afterEach(() => {
      pages.findByCampaign.reset()
      totals.findByCampaigns.reset()
    })

    after(() => {
      pages.findByCampaign.restore()
      totals.findByCampaigns.restore()
    })

    describe('pages information', () => {
      it('retrieves pages information', () => {
        mount(<CampaignSocialProof campaignUid='au-123' />)
        expect(pages.findByCampaign.calledOnce).to.equal(true)
        pages.findByCampaign.should.have.been.calledWith('au-123')
      })

      it('transforms result and updates state', () => {
        const element = mount(<CampaignSocialProof campaignUid='au-123' />)
        const state = element.state()
        expect(state.images.length).to.equal(5)
        expect(state.images).to.include('http://example.com/image1')
        expect(state.images).to.include('http://example.com/image2')
        expect(state.images).to.include('http://example.com/image3')
        expect(state.images).to.include('http://example.com/image4')
        expect(state.images).to.include('http://example.com/image5')
        expect(state.numberOfPages).to.equal(123)
      })
    })

    describe('totals information', () => {
      it('retrieves totals information', () => {
        mount(<CampaignSocialProof campaignUid='au-123' />)
        expect(totals.findByCampaigns.calledOnce).to.equal(true)
        totals.findByCampaigns.should.have.been.calledWith({campaignUids: ['au-123']})
      })

      it('transforms result and updates state', () => {
        const element = mount(<CampaignSocialProof campaignUid='au-123' />)
        expect(element.state().numberOfDonations).to.equal(6000)
      })
    })

    describe('renders components', () => {
      it('photos', () => {
        const wrapper = mount(<CampaignSocialProof campaignUid='au-123' />)
        const photos = wrapper.find('.CampaignSocialProof__photo')
        expect(photos.length).to.equal(5)
      })

      it('subtitle', () => {
        const wrapper = mount(<CampaignSocialProof campaignUid='au-123' />)
        const subtitle = wrapper.find('.CampaignSocialProof__subtitle')
        expect(subtitle.text()).to.equal('6,123 contributors')
      })
    })
  })
})
