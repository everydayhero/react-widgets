import _ from 'lodash'
import React from 'react'
import I18nMixin from '../../mixins/I18n'
import campaigns from '../../../api/campaigns'
import Icon from '../../helpers/Icon'
import numeral from 'numbro'
var METERS_TO_MILES = 0.000621371192

export default React.createClass({
  displayName: 'TotalDistance',
  mixins: [I18nMixin],
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    unit: React.PropTypes.oneOf(['km', 'miles']),
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
      unit: 'miles',
      format: '0,0[.]0[0]',
      defaultI18n: {
        title: 'Miles',
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
      return sum + n.distance_in_meters
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
        total: fitnessActivity
      })
    } else {
      this.setState({ isLoading: false })
    }
  },

  formatDistance: function (meters) {
    if (this.props.unit === 'km') {
      return numeral(meters / 1000).format(this.props.format)
    } else {
      return numeral(meters * METERS_TO_MILES).format(this.props.format)
    }
  },

  renderTotal: function () {
    var title = this.t('title')
    var emptyLabel = this.t('emptyLabel')
    var formattedTotal = this.formatDistance(this.state.total)

    if (this.state.isLoading) {
      return <Icon className='TotalDistance__loading' icon='refresh' />
    }

    if (this.state.total) {
      return (
        <div className='TotalDistance__content'>
          <div className='TotalDistance__total'>{ formattedTotal }</div>
          <div className='TotalDistance__title'>{ title }</div>
        </div>
      )
    }

    return <p className='TotalDistance__empty-label'>{ emptyLabel }</p>
  },

  renderIcon: function () {
    var renderIcon = this.props.renderIcon

    if (renderIcon === true) {
      renderIcon = 'angle-double-right'
    }

    if (renderIcon) {
      return <Icon className='TotalDistance__icon' icon={renderIcon} />
    }
  },

  render: function () {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={'TotalDistance'} style={customStyle}>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    )
  }
})
