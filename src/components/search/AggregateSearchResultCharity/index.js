"use strict";

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');
var I18n          = require('../../mixins/I18n');
var causeGroups   = require('../../../lib/causeGroups');
var AggregateSearchResult = require('../AggregateSearchResult');

module.exports = React.createClass({
  displayName: 'AggregateSearchResultCharity',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        numSupporters: '{count:0,0} Supporters'
      }
    };
  },

  renderLogo: function () {
    var charity = this.props.result;

    return !!charity.logo_url && (
      <div className="AggregateSearchResultCharity__logo">
        <img src={ charity.logo_url } />
      </div>
    );
  },

  renderAvatar: function () {
    var charity = this.props.result;
    var cause = charity.causes && charity.causes[0] && charity.causes[0].key;
    var causeGroup = cause && causeGroups.findByCause(cause);
    var icon = causeGroup ? causeGroup.icon : 'heart-o';

    return (
      <div className='AggregateSearchResultCharity__avatar'>
        <Icon icon={ icon } fixedWidth={ true } />
      </div>
    );
  },

  renderNumSupporters: function () {
    var charity = this.props.result;

    return charity.page_count >= 20 && (
      <span className='AggregateSearchResultCharity__supporters'>
        { this.t('numSupporters', { count: charity.page_count }) }
      </span>
    );
  },

  render: function() {
    var charity = this.props.result;

    return (
      <AggregateSearchResult url={ charity.url } onSelect={ this.props.onSelect }>
        { this.renderLogo() || this.renderAvatar() }
        <div className='AggregateSearchResultCharity__content'>
          <div className='AggregateSearchResultCharity__header'>{ charity.name }</div>
          <div className='AggregateSearchResultCharity__subheader'>
            { this.renderNumSupporters() }
          </div>
          <p className='AggregateSearchResultCharity__description'>{ charity.description }</p>
        </div>
      </AggregateSearchResult>
    );
  }
});
