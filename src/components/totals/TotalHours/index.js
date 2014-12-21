"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var campaigns = require('../../../api/campaigns');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalHours",
  propTypes: {
    campaignUids: React.PropTypes.array,
    renderIcon: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUids: [],
      renderIcon: true,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      defaultI18n: {
        title: 'Hours',
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
    this.setState({
      isLoading: true
    });

    _.each(this.props.campaignUids, function(campaignUid) {
      campaigns.find(campaignUid, this.onSuccess);
    }, this);
  },

  onSuccess: function(result) {
    var fitnessResults = result.campaign.fitness_activity_overview.run;

    if (fitnessResults){
      this.setState({
        isLoading: false,
        total: this.state.total + fitnessResults.duration_in_seconds
      });
    } else {
      this.setState({ isLoading: false });
    }
  },

  renderTotal: function() {
    var symbol         = this.t('symbol');
    var totalHrs       = this.state.total * 0.000277778;
    var formattedTotal = numeral(totalHrs).format('0,0[.]00');
    var title          = this.t('title');
    var emptyLabel     = this.t('emptyLabel');

    if (this.state.isLoading) {
      return <Icon className="TotalHours__loading" icon="refresh" />;
    }

    if (this.state.total) {
      return (
        <div className="TotalHours__content">
          <div className="TotalHours__total">{ formattedTotal }</div>
          <div className="TotalHours__title">{ title }</div>
        </div>
      );
    }

    return <p className="TotalHours__empty-label">{ emptyLabel }</p>;
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return <Icon className="TotalHours__icon" icon="clock-o"/>;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "TotalHours" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
