import address from '../address'
import * as getJSONP from '../../lib/getJSONP'

describe('address', () => {
  const callback = () => {}

  beforeEach(() => {
    sinon.stub(getJSONP, 'default')
  })

  afterEach(() => {
    getJSONP.default.restore()
  })

  describe('find', () => {
    it('gets an address by id', () => {
      address.find('123', 'uk', callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/addresses/uk/123.jsonp',
        callback
      )
    })
  })

  describe('search', () => {
    it('searches for addresses', () => {
      address.search('blah', 'uk', callback)

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/addresses.jsonp?country_code=uk&q=blah',
        callback
      )
    })
  })
})
