import React from 'react';
import I18nMixin from '../../mixins/I18n';
import totals from '../../../api/totals';
import Icon from '../../helpers/Icon';
import numeral from 'numbro';

export default React.createClass({
  displayName: 'TotalDonations',
  mixins: [I18nMixin],
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    charityUids: React.PropTypes.array,
    startAt: React.PropTypes.string,
    endAt: React.PropTypes.string,
    offset: React.PropTypes.number,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    groupValue: React.PropTypes.string,
    groupValues: React.PropTypes.array,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: null,
      campaignUids: null,
      charityUid: null,
      charityUids: null,
      startAt: null,
      endAt: null,
      offset: 0,
      renderIcon: true,
      backgroundColor: '',
      textColor: '',
      format: '0,0',
      defaultI18n: {
        title: 'Donations'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      total: this.state.total + result.total_amount_cents.count
    });
  },

  componentWillMount: function() {
    this.loadTotals();
  },

  setUids: function() {
    var campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  loadTotals: function() {
    this.setState({ isLoading: true });

    var props        = this.props;
    var campaignUids = props.campaignUid || props.campaignUids;
    var charityUids  = props.charityUid || props.charityUids;
    var groupValues  = props.groupValue || props.groupValues;

    var options = {};
    if (props.startAt) {
      options.start = props.startAt;
    }
    if (props.endAt) {
      options.end = props.endAt;
    }

    if (campaignUids && charityUids) {
      totals.findByAll({
        campaignUids: campaignUids,
        charityUids: charityUids,
        groupValues: groupValues
      }, this.onSuccess, options);
    } else if (campaignUids) {
      totals.findByCampaigns({
        campaignUids: campaignUids,
        groupValues: groupValues
      }, this.onSuccess, options);
    } else if (charityUids) {
      totals.findByCharities({
        charityUids: charityUids,
        groupValues: groupValues
      }, this.onSuccess, options);
    }
  },

  renderTotal: function() {
    var totalDonations = this.state.total + this.props.offset;
    var formattedTotal = numeral(totalDonations).format(this.props.format);
    var title          = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalDonations__loading" icon="refresh" />;
    }

    return (
      <div>
        <div className="TotalDonations__total">{ formattedTotal }</div>
        <div className="TotalDonations__title">{ title }</div>
      </div>
    );
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = 'life-saver';
    }

    if (renderIcon) {
      return <Icon className="TotalDonations__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TotalDonations" style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
