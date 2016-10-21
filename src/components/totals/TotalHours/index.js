import _ from 'lodash'
import React from 'react'
import I18nMixin from '../../mixins/I18n'
import campaigns from '../../../api/campaigns'
import Icon from '../../helpers/Icon'
import numeral from 'numbro'
var SECONDS_TO_HOURS = 1 / 3600

export default React.createClass({
  displayName: 'TotalHours',
  mixins: [I18nMixin],
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      campaignUid: '',
      campaignUids: [],
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0[.]0[0]',
      defaultI18n: {
        title: 'Hours',
        emptyLabel: 'No data to display.'
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
    this.loadCampaigns()
  },

  setUids: function () {
    var campaignUids = []

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid)
    } else {
      campaignUids = this.props.campaignUids
    }

    return campaignUids
  },

  loadCampaigns: function () {
    this.setState({ isLoading: true })
    campaigns.findByUids(this.setUids(), this.onSuccess)
  },

  combineActivityData: function (fitnessActivity) {
    return _.reduce(fitnessActivity, function (sum, n) {
      return sum + n.duration_in_seconds
    }, 0)
  },

  onSuccess: function (result) {
    var fitnessActivity = 0

    _.forEach(result.campaigns, function (campaign) {
      fitnessActivity += this.combineActivityData(campaign.fitness_activity_overview)
    }.bind(this))

    if (fitnessActivity) {
      this.setState({
        isLoading: false,
        hasResults: true,
        total: fitnessActivity
      })
    } else {
      this.setState({ isLoading: false })
    }
  },

  renderTotal: function () {
    var totalHours = this.state.total * SECONDS_TO_HOURS
    var formattedTotal = numeral(totalHours).format(this.props.format)
    var title = this.t('title')
    var emptyLabel = this.t('emptyLabel')

    if (this.state.isLoading) {
      return <Icon className='TotalHours__loading' icon='refresh' />
    }

    if (this.state.total) {
      return (
        <div className='TotalHours__content'>
          <div className='TotalHours__total'>{ formattedTotal }</div>
          <div className='TotalHours__title'>{ title }</div>
        </div>
      )
    }

    return <p className='TotalHours__empty-label'>{ emptyLabel }</p>
  },

  renderIcon: function () {
    var renderIcon = this.props.renderIcon

    if (renderIcon === true) {
      renderIcon = 'clock-o'
    }

    if (renderIcon) {
      return <Icon className='TotalHours__icon' icon={renderIcon} />
    }
  },

  render: function () {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={'TotalHours'} style={customStyle}>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    )
  }
})
