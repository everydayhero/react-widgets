import React from 'react'
import classnames from 'classnames'

const content = (loading, number, label) => {
  return (
    <div>
      <span className='CampaignSummaryStat__number' key='number'>
        {`${number} `}
      </span>
      <span className='CampaignSummaryStat__label' key='label'>
        {label}
      </span>
    </div>
  )
}

const Stat = ({ loading, number, label, type }) => {
  const classNames = classnames({
    'CampaignSummaryStat': true,
    'CampaignSummaryStat--loading': loading,
    'CampaignSummaryStat--notLoading': !loading,
    [`CampaignSummaryStat--${type}`]: type
  })
  return (
    <div className={classNames}>
      {content(loading, number, label)}
    </div>
  )
}

Stat.displayName = 'CampaignSummaryStat'

Stat.propTypes = {
  number: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  label: React.PropTypes.string
}

export default Stat
