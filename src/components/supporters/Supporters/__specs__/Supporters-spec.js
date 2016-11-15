import React from 'react'
import { mount } from 'enzyme'

import Supporters from '../'
import * as getJSONP from '../../../../lib/getJSONP'

describe('Supporters', () => {
  describe('page exclusion', () => {
    before(() => {
      sinon.stub(getJSONP, 'default')
    })

    after(() => {
      getJSONP.default.restore()
    })

    afterEach(() => {
      getJSONP.default.reset()
    })

    it('fetches the default number of pages, plus the number of excluded pages', () => {
      mount(<Supporters campaignUid='au-123' exclusions={[1234, 5678]} />)
      expect(getJSONP.default.args[0][0]).include('&limit=22')
    })

    it('fetches the default number of pages when no exclusions set', () => {
      mount(<Supporters campaignUid='au-123' />)
      expect(getJSONP.default.args[0][0]).include('&limit=20')
    })
  })
})
