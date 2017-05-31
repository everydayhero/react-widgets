import totals from '../totals'
import * as getJSONP from '../../lib/getJSONP'

describe('totals', () => {
  const callback = () => {}

  beforeEach(() => {
    sinon.stub(getJSONP, 'default')
  })

  afterEach(() => {
    getJSONP.default.restore()
  })

  describe('findByCampaigns', () => {
    it('gets total from campaign id', () => {
      totals.findByCampaigns({ campaignUids: 'us-22' }, callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?campaign_ids=us-22',
        callback
      )
    })

    it('gets total from multiple campaign uids', () => {
      totals.findByCampaigns({ campaignUids: ['xx-123', 'yy-123'] }, callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?campaign_ids=xx-123,yy-123',
        callback
      )
    })
  })

  describe('findByPage', () => {
    it('gets total from page id', () => {
      totals.findByPages('848751', callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?page_ids=848751',
        callback
      )
    })
  })

  describe('findByCharity', () => {
    it('gets total from charity id', () => {
      totals.findByCharities({ charityUids: 'au-31' }, callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?charity_ids=au-31',
        callback
      )
    })
  })

  describe('filterOnGroups', () => {
    it('gets total from charity id, filtered on a group', () => {
      totals.findByCharities({
        charityUids: 'au-31',
        groupValues: 'SchoolName'
      }, callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?charity_ids=au-31&group_values=SchoolName',
        callback
      )
    })

    it('gets total from charity id, filtered on multiple groups', () => {
      totals.findByCharities({
        charityUids: 'au-31',
        groupValues: ['SchoolName', 'ABC']
      }, callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/totals.jsonp?charity_ids=au-31&group_values=SchoolName,ABC',
        callback
      )
    })
  })
})
