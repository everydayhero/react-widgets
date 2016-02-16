'use strict';

var _               = require('lodash');
var React           = require('react');
var I18nMixin       = require('../../mixins/I18n');
var campaigns       = require('../../../api/campaigns');
var Icon            = require('../../helpers/Icon');
var numeral         = require('numeral');

module.exports = React.createClass({
  displayName: 'TotalCalories',
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

  getDefaultProps: function() {
    return {
      campaignUid: '',
      campaignUids: [],
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0',
      defaultI18n: {
        title: 'Calories',
        emptyLabel: 'No data to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  componentWillMount: function() {
    this.loadCampaigns();
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

  loadCampaigns: function() {
    this.setState({ isLoading: true });
    campaigns.findByUids(this.setUids(), this.onSuccess);
  },

  combineActivityData: function(fitnessActivity) {
    return _.reduce(fitnessActivity, function(sum, n) {
      return sum += n.calories;
    }, 0);
  },

  onSuccess: function(result) {
    var fitnessActivity = 0;

    _.forEach(result.campaigns, function(campaign) {
      fitnessActivity += this.combineActivityData(campaign.fitness_activity_overview);
    }, this);

    if (fitnessActivity){
      this.setState({
        isLoading: false,
        total: fitnessActivity
      });
    } else {
      this.setState({ isLoading: false });
    }
  },

  renderTotal: function() {
    var title          = this.t('title');
    var emptyLabel     = this.t('emptyLabel');
    var formattedTotal = numeral(this.state.total).format(this.props.format);

    if (this.state.isLoading) {
      return <Icon className="TotalCalories__loading" icon="refresh" />;
    }

    if (this.state.total) {
      return (
        <div className="TotalCalories__content">
          <div className="TotalCalories__total">{ formattedTotal }</div>
          <div className="TotalCalories__title">{ title }</div>
        </div>
      );
    }

    return <p className="TotalCalories__empty-label">{ emptyLabel }</p>;
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = 'fire';
    }

    if (renderIcon) {
      return <Icon className="TotalCalories__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "TotalCalories" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
