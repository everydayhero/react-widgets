/** @jsx React.DOM */
"use strict";

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
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      renderIcon: true,
      backgroundColor: '#555555',
      textColor: '#FFFFFF',
      unit: 'miles',
      defaultI18n: {
        title: 'Miles',
        emptyLabel: 'No data to display.'
      }
    }
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

    campaigns.find(this.props.campaignUid, this.onSuccess);
  },

  onSuccess: function(result) {


    var fitnessResults = result.campaign.fitness_activity_overview.run;

    if (typeof fitnessResults === 'undefined'){
      this.setState({
        isLoading: false,
        hasResults: false
      });
    } else {
      this.setState({
        isLoading: false,
        hasResults: true,
        total: fitnessResults.distance_in_meters
      });
    }
  },

  renderTotal: function() {
    var symbol     = this.t('symbol');
    var title      = this.t('title');
    var totalKms   = this.state.total / 100;
    var totalMiles = totalKms * 0.621371192;
    var emptyLabel = this.t('emptyLabel');

    if (this.props.unit === 'km') {
      var formattedTotal = numeral(totalKms).format('0,0[.]00');
    } else {
      var formattedTotal = numeral(totalMiles).format('0,0[.]00');
    }

    if (this.state.isLoading) {
      return <Icon className="TotalDistance__loading" icon="refresh" spin={ true }/>;
    } else {
      if (this.state.hasResults) {
        return (
          <div className="TotalDistance__content">
            <div className="TotalDistance__total">{ formattedTotal }</div>
            <div className="TotalDistance__title">{ title }</div>
          </div>
        )
      } else {
        return (
          <p className="TotalDistance__empty-label">{ emptyLabel }</p>
        )
      }
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return (
        <Icon className="TotalDistance__icon" icon="angle-double-right"/>
      );
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className={ "TotalDistance" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
