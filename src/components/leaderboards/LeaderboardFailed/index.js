import React, { PropTypes } from 'react'
import Icon from '../../helpers/Icon'

const LeaderboardFailed = ({ text }) => {
  return (
    <div className='LeaderboardFailed'>
      <Icon className='LeaderboardFailed__icon' icon='frown-o' />
      <div className='LeaderboardFailed__content'>{ text }</div>
    </div>
  )
}

LeaderboardFailed.displayName = 'LeaderboardFailed'
LeaderboardFailed.propTypes = {
  text: PropTypes.string.isRequired
}

export default LeaderboardFailed
