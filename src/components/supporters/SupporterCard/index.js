import React from 'react'
import SupporterCardGiveNow from '../SupporterCardGiveNow'
import Footprint from '../../footprint/Footprint'

export default React.createClass({
  displayName: 'SupporterCard',

  propTypes: {
    footprint: React.PropTypes.array,
    image: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    target: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired,
    currency: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    charityName: React.PropTypes.string,
    eventName: React.PropTypes.string
  },

  render: function () {
    var props = this.props
    var style = {
      width: props.width
    }

    return (
      <div className='SupporterCardWrapper' style={style}>
        <div className='SupporterCard'>
          <Footprint
            data={props.footprint}
            compact
            size={140}
            userImage={props.image}
            userName={props.name}
            userUrl={props.url} />

          <a href={props.url} target='_top' className='SupporterCard__userDetails'>
            <div className='SupporterCard__name'>{ props.name }</div>
            { props.charityName && <div className='SupporterCard__charity'>For <strong>{ props.charityName }</strong></div> }
            { props.eventName && <div className='SupporterCard__event'>Through <strong>{ props.eventName }</strong></div> }
          </a>

          <SupporterCardGiveNow
            url={props.url}
            target={props.target}
            current={props.current}
            i18n={{ currency: props.currency }} />
        </div>
      </div>
    )
  }
})
