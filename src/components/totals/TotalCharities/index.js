"use strict";

var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var charities = require('../../../api/charities');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numbro');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalCharities",
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
      format: '0,0 a',
      defaultI18n: {
        title: 'Non Profits'
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
    this.loadCharities();
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

  loadCharities: function() {
    this.setState({ isLoading: true });
    charities.findByCampaign(this.setUids(), 1, 1, this.onSuccess);
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      total: result.meta.count
    });
  },

  renderTotal: function() {
    var totalCharities = this.state.total;
    var formattedTotal = numeral(totalCharities).format(this.props.format);
    var title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalCharities__loading" icon="refresh" />;
    } else {
      return (
        <div>
          <div className="TotalCharities__total">{ formattedTotal }</div>
          <div className="TotalCharities__title">{ title }</div>
        </div>
      );
    }
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = "heart";
    }

    if (renderIcon) {
      return <Icon className="TotalCharities__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "TotalCharities" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
