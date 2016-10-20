import React from 'react'
import I18nMixin from '../../mixins/I18n'
import CallToActionButton from '../../callstoaction/CallToActionButton'

function _wholeRound (num) {
  return num % 1 !== 0 ? num.toFixed(2) : num
}

export default React.createClass({
  displayName: 'SupporterCardGiveNow',

  mixins: [I18nMixin],

  propTypes: {
    current: React.PropTypes.number.isRequired,
    target: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      current: 50,
      target: 100,
      url: '#',
      defaultI18n: {
        cta: 'Give Now',
        currency: '$',
        label: 'Only **{currency}{amount_remaining}** to go',
        achievedLabel: '**{currency}{amount_raised}** raised so far'
      }
    }
  },

  getLabel: function () {
    var props = this.props

    return this.tm(props.current >= props.target ? 'achievedLabel' : 'label', {
      currency: this.t('currency'),
      amount_raised: _wholeRound(props.current),
      amount_remaining: _wholeRound(props.target - props.current)
    })
  },

  render: function () {
    var t = this.t
    var props = this.props
    var progress = props.target > 0 ? Math.floor(props.current / props.target * 100) : 0

    return (
      <div className='SupporterCardGiveNow'>
        <CallToActionButton kind='secondary' href={props.url} className='SupporterCardGiveNow__cta'>{ t('cta') }</CallToActionButton>
        <div className='SupporterCardGiveNow__progress'>
          <div className='SupporterCardGiveNow__current' style={{ width: Math.min(progress, 100) + '%' }} />
        </div>
        <div className='SupporterCardGiveNow__label'>{ this.getLabel() }</div>
      </div>
    )
  }
})
