import React from 'react'
import { mount } from 'enzyme'

import Leaderboard from '../'
import * as api from '../../../../api/routes/staticLeaderboard'

const pageData = {
  amount: 247600,
  charityName: 'febfast',
  id: 18116,
  imgSrc: 'https://dm5ei4oosl5j.cloudfront.net/pages/images/18116/large/Me_and_Dad-2afc862c118d1cfe119befa88e2df153.JPG',
  isoCode: 'AUD',
  medImgSrc: 'https://dm5ei4oosl5j.cloudfront.net/pages/images/18116/medium/Me_and_Dad-2afc862c118d1cfe119befa88e2df153.JPG',
  name: 'Lily',
  symbol: '$',
  totalMembers: 0,
  url: 'https://ccwfebfast.everydayhero.com/au/lily-tsen',
  rank: 1
}

describe('Leaderboard', () => {
  describe('static leaderboard', () => {
    before(() => {
      sinon.stub(api, 'default', ({ id }) => (
        new Promise((resolve, reject) => {
          if (id) {
            return resolve([pageData])
          } else {
            return reject()
          }
        })
      ))
    })

    after(() => {
      api.default.restore()
    })

    it('calls the API with a leaderboard ID', () => {
      mount(<Leaderboard leaderboardId='123' />)
      expect(api.default.calledOnce).to.be.true
      expect(api.default).to.have.been.calledWith({
        id: '123'
      })
    })
  })
})

