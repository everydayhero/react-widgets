import React from 'react'
import I18nMixin from '../../mixins/I18n'
import totals from '../../../api/totals'
import Icon from '../../helpers/Icon'
import numeral from 'numbro'

export default React.createClass({
  mixins: [I18nMixin],
  displayName: 'FundsRaised',
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    teamId: React.PropTypes.string,
    teamIds: React.PropTypes.array,
    pageId: React.PropTypes.string,
    pageIds: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
    groupValues: React.PropTypes.array,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string,
    offset: React.PropTypes.number,
    onLoad: React.PropTypes.func,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      campaignUid: null,
      campaignUids: null,
      teamId: null,
      teamIds: null,
      pageId: null,
      pageIds: null,
      charityUid: null,
      charityUids: null,
      startAt: null,
      endAt: null,
      offset: 0,
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0.00 a',
      defaultI18n: {
        title: 'Raised To Date',
        symbol: '$'
      }
    }
  },

  getInitialState: function () {
    return {
      isLoading: false,
      total: 0
    }
  },

  componentWillMount: function () {
    this.loadTotals()
  },

  loadTotals: function () {
    this.setState({ isLoading: true })

    var props = this.props
    var campaignUids = props.campaignUid || props.campaignUids
    var charityUids = props.charityUid || props.charityUids
    var pageIds = props.pageId || props.pageIds
    var teamIds = props.teamId || props.teamIds

    var options = {}

    if (props.startAt) {
      options.start = props.startAt
    }

    if (props.endAt) {
      options.end = props.endAt
    }
    if (teamIds) {
      totals.findByTeams(teamIds, this.onSuccess, options)
    } else if (pageIds) {
      totals.findByPages(pageIds, this.onSuccess, options)
    } else if (charityUids && campaignUids) {
      totals.findByAll({
        charityUids: charityUids,
        campaignUids: campaignUids,
        groupValues: props.groupValues
      }, this.onSuccess, options)
    } else if (charityUids) {
      totals.findByCharities({
        charityUids: charityUids,
        groupValues: props.groupValues
      }, this.onSuccess, options)
    } else if (campaignUids) {
      totals.findByCampaigns({
        campaignUids: campaignUids,
        groupValues: props.groupValues
      }, this.onSuccess, options)
    }
  },

  onSuccess: function (result) {
    this.setState({
      total: this.state.total + result.total_amount_cents.sum,
      isLoading: false
    })

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(result)
    }
  },

  renderTotal: function () {
    var symbol = this.t('symbol')
    var totalDollars = (this.state.total + this.props.offset) / 100
    var formattedTotal = symbol + numeral(totalDollars).format(this.props.format)
    var title = this.t('title')

    if (this.state.isLoading) {
      return <Icon className='FundsRaised__loading' icon='refresh' />
    } else {
      return (
        <div>
          <div className='FundsRaised__total'>{ formattedTotal }</div>
          <div className='FundsRaised__title'>{ title }</div>
        </div>
      )
    }
  },

  renderIcon: function () {
    var renderIcon = this.props.renderIcon

    if (renderIcon === true) {
      renderIcon = 'money'
    }

    if (renderIcon) {
      return <Icon className='FundsRaised__icon' icon={renderIcon} />
    }
  },

  render: function () {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={'FundsRaised'} style={customStyle}>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    )
  }
})
