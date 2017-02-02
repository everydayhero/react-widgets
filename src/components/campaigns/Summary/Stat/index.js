import React from 'react'

const content = (loading, number, label) => {
  if (loading) return <span />
  return (
    <div>
      <span className='CampaignSummaryStat__number' key='number'>
        {`${number} `}
      </span>
      <span className='CampaignSummaryStat__stat' key='stat'>
        {label}
      </span>
    </div>
  )
}

const Stat = ({ loading, number, label }) => {
  return (
    <div className={`CampaignSummaryStat CampaignSummaryStat--${loading ? 'loading' : 'notLoading'}`}>
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
