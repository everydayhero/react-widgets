import React from 'react';
import Icon from '../../helpers/Icon';
import I18n from '../../mixins/I18n';
import AggregateSearchResult from '../AggregateSearchResult';

export default React.createClass({
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
    return (
      <div className="AggregateSearchResultCharity__avatar">
        <Icon icon="heart-o" fixedWidth />
      </div>
    );
  },

  renderNumSupporters: function () {
    var charity = this.props.result;

    return charity.page_count >= 20 && (
      <span className="AggregateSearchResultCharity__supporters">
        { this.t('numSupporters', { count: charity.page_count }) }
      </span>
    );
  },

  render: function() {
    var charity = this.props.result;

    return (
      <AggregateSearchResult result={ charity } onSelect={ this.props.onSelect }>
        { this.renderLogo() || this.renderAvatar() }
        <div className="AggregateSearchResultCharity__content">
          <div className="AggregateSearchResultCharity__header">{ charity.name }</div>
          <div className="AggregateSearchResultCharity__subheader">
            { this.renderNumSupporters() }
          </div>
          <p className="AggregateSearchResultCharity__description">{ charity.description }</p>
        </div>
      </AggregateSearchResult>
    );
  }
});
