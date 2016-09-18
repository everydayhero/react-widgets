import React from 'react';
import I18nMixin from '../../mixins/I18n';
import campaigns from '../../../api/campaigns';
import Icon from '../../helpers/Icon';
import numeral from 'numbro';

export default React.createClass({
  displayName: 'TotalCustomMetric',
  mixins: [I18nMixin],
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    offset: React.PropTypes.number,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object.isRequired,
    icon: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      offset: 0,
      renderIcon: true,
      backgroundColor: '',
      textColor: '',
      format: '0,0',
      icon: 'bar-chart'
    };
  },

  getInitialState: function () {
    return {
      isLoading: false,
      total: 0
    };
  },

  componentWillMount: function () {
    this.loadCampaign();
  },

  onSuccess: function (result) {
    this.setState({
      isLoading: false,
      total: this.state.total + result.campaign.custom_metric_total.custom_metric.amount + this.props.offset
    });
  },

  loadCampaign: function () {
    this.setState({ isLoading: true });
    campaigns.find(this.props.campaignUid, this.onSuccess)
  },

  renderTotal: function () {
    const title          = this.t('title');
    const formattedTotal = numeral(this.state.total)
      .format(this.props.format);

    if (this.state.isLoading) {
      return <Icon className="TotalCustomMetric__loading" icon="refresh" />;
    }

    return (
      <div>
        <div className="TotalCustomMetric__total">{ formattedTotal }</div>
        <div className="TotalCustomMetric__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function () {
    if (this.props.renderIcon) {
      return <Icon className="TotalCustomMetric__icon" icon={this.props.icon} />;
    }
  },

  render: function () {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TotalCustomMetric" style={customStyle}>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
