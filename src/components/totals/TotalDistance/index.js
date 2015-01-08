"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var campaigns = require('../../../api/campaigns');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalDistance",
  propTypes: {
    campaignUid: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    unit: React.PropTypes.oneOf(['km', 'miles']),
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      unit: 'miles',
      format: '0,0[.]0[0]',
      defaultI18n: {
        title: 'Miles',
        emptyLabel: 'No data to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      hasResults: false,
      total: 0
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    campaigns.find(this.props.campaignUid, this.combineActivityData);
  },

  combineActivityData: function(result) {
    var fitnessActivity = result.campaign.fitness_activity_overview;

    if (fitnessActivity !== null) {
      var new_fitness_activity_overview = {
        distance_in_meters: 0
      };

      _.forOwn(fitnessActivity, function(num, key) {
        var fitness_activity_overview = fitnessActivity[key];
        new_fitness_activity_overview.distance_in_meters += fitness_activity_overview.distance_in_meters;
      });

      fitnessActivity = new_fitness_activity_overview;
    }

    this.onSuccess(fitnessActivity);
  },

  onSuccess: function(combinedFitnessActivity) {
    if (combinedFitnessActivity){
      this.setState({
        isLoading: false,
        hasResults: true,
        total: combinedFitnessActivity.distance_in_meters
      });
    } else {
      this.setState({
        isLoading: false,
        hasResults: false
      });
    }
  },

  formatDistance: function(meters) {
    if (this.props.unit === 'km') {
      return numeral(meters / 1000).format(this.props.format);
    } else {
      return numeral(meters * 0.000621371192).format(this.props.format);
    }
  },

  renderTotal: function() {
    var symbol         = this.t('symbol');
    var title          = this.t('title');
    var emptyLabel     = this.t('emptyLabel');
    var formattedTotal = this.formatDistance(this.state.total);

    if (this.state.isLoading) {
      return <Icon className="TotalDistance__loading" icon="refresh" />;
    }

    if (this.state.hasResults) {
      return (
        <div className="TotalDistance__content">
          <div className="TotalDistance__total">{ formattedTotal }</div>
          <div className="TotalDistance__title">{ title }</div>
        </div>
      );
    }

    return <p className="TotalDistance__empty-label">{ emptyLabel }</p>;
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return <Icon className="TotalDistance__icon" icon="angle-double-right"/>;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "TotalDistance" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
