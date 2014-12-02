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
    var charity = this.props.result.charity;
    return _.compact([charity.locality, charity.region]).join(', ');
  },

  showMerchantName: function() {
    var charity      = this.props.result.charity;
    var name         = normaliseForComparison(charity.name || '');
    var merchantName = normaliseForComparison(charity.merchant_name || '');

    return merchantName && !name.match(merchantName);
  },

  render: function() {
    var props = this.props;
    var result = props.result;
    var charity = result.charity;
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
      <SearchResult url={ result.url } onSelect={ props.onSelect } result={ result.charity }>
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
