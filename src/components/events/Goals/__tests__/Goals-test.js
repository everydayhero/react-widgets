jest.disableAutomock()
jest.mock('../../../../api/totals')

import CampaignGoals from '../'
import totals from '../../../../api/totals'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
var findByClass = ReactTestUtils.findRenderedDOMComponentWithClass

describe('Rendering default components', function () {
  var campaignTotals
  var element
  totals.findByCampaigns.mockClear()
  beforeEach(function () {
    campaignTotals = (<CampaignGoals campaigns={[{
      uid: 'us-22',
      name: 'Campaign',
      goal: 65000
    }]} />)
    element = ReactTestUtils.renderIntoDocument(campaignTotals)
  })

  it('will render a goals container', function () {
    var container = findByClass(element, 'CampaignGoals__container')
    expect(container).not.toBeNull()
  })
})

describe('API Calls', function () {
  var campaignTotals

  beforeEach(function () {
    totals.findByCampaigns.mockClear()
    campaignTotals = (<CampaignGoals campaigns={[{
      uid: 'us-22',
      name: 'Campaign 1',
      goal: 65000
    }, {
      uid: 'us-24',
      name: 'Campaign 3',
      goal: 8000
    }]} />)
    ReactTestUtils.renderIntoDocument(campaignTotals)
  })

  it('will make one call for each specified campaign UID', function () {
    expect(totals.findByCampaigns.mock.calls.length).toEqual(2)
    expect(totals.findByCampaigns.mock.calls[0][0]).toEqual({ campaignUids: 'us-22' })
    expect(totals.findByCampaigns.mock.calls[1][0]).toEqual({ campaignUids: 'us-24' })
  })
})
