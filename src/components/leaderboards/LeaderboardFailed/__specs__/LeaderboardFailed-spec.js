import React from 'react'
import { shallow } from 'enzyme'
import LeaderboardFailed from '../'
import Icon from '../../../helpers/Icon'
let wrapper

describe('LeaderboardFailedComponent', () => {
  before(() => {
    wrapper = shallow(<LeaderboardFailed text='foobar' />)
  })

  it('renders text content', () => {
    expect(wrapper.find('.LeaderboardFailed__content').text()).to.equal('foobar')
  })

  it('renders and icon', () => {
    expect(wrapper.find(Icon).length).to.equal(1)
  })
})
