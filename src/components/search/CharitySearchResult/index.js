"use strict";

var _             = require('lodash');
var React         = require('react');
var SearchResult  = require('../SearchResult');
var Icon          = require('../../helpers/Icon');

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

  render: function() {
    var props = this.props;
    var result = props.result;
    var charity = result.charity;
    var location = this.location();

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
      <SearchResult onSelect={ props.onSelect } result={ result }>
        { logo }
        <div className='CharitySearchResult__content'>
          <div className='CharitySearchResult__header'>{ charity.name }</div>
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
