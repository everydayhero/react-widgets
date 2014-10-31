/** @jsx React.DOM */
"use strict";

var _             = require('lodash');
var React         = require('react');
var SearchResult  = require('../SearchResult');
var Icon          = require('../../helpers/Icon');

function normaliseForComparison(string) {
  return string.replace(/^\s+|\s+$|[^ \w]|_/gm, '').replace(/\s{2,}/g, ' ').toLowerCase();
}

module.exports = React.createClass({
  displayName: 'CharitySearchResult',

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    result: React.PropTypes.object.isRequired,
    selectAction: React.PropTypes.string.isRequired
  },

  location: function() {
    return _.compact([this.props.result.locality, this.props.result.region]).join(', ');
  },

  showMerchantName: function() {
    var name         = normaliseForComparison(this.props.result.name || ''),
        merchantName = normaliseForComparison(this.props.result.merchant_name || '');

    return merchantName && !name.match(merchantName);
  },

  render: function() {
    var props = this.props;
    var charity = props.result;
    var location = this.location();
    var header = [ charity.name ];

    if (this.showMerchantName()) {
      header.push(<span className="merchant-name">{ charity.merchant_name }</span>);
    }

    var logo;
    if (charity.logo_url) {
      logo = (
        <div className="CharitySearchResult__logo">
          <img src={ charity.logo_url } />
        </div>
      );
    } else {
      logo = (
        <div className='CharitySearchResult__avatar'>
          <Icon icon='heart-o' fixedWidth={ true } />
        </div>
      );
    }

    return (
      <SearchResult onSelect={ props.onSelect } result={ charity }>
        { logo }
        <div className='CharitySearchResult__content'>
          <div className='CharitySearchResult__header'>{ header }</div>
          <p className='CharitySearchResult__description'>{ charity.description }</p>
          <div className='CharitySearchResult__footer'>{ location }</div>
        </div>
        <div className='CharitySearchResult__actions'>
          { props.selectAction }
          <Icon icon="arrow-right" fixedWidth={ true } />
        </div>
      </SearchResult>
    );
  }
});
