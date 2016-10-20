import _ from 'lodash';
import React from 'react';
import SearchResult from '../SearchResult';
import Icon from '../../helpers/Icon';

export default React.createClass({
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
        <div className="CharitySearchResult__avatar">
          <Icon icon="heart-o" fixedWidth />
        </div>
      );
    }

    return (
      <SearchResult onSelect={ props.onSelect } result={ result }>
        { logo }
        <div className="CharitySearchResult__content">
          <div className="CharitySearchResult__header">{ charity.name }</div>
          <p className="CharitySearchResult__description">{ charity.description }</p>
          <div className="CharitySearchResult__footer">{ location }</div>
        </div>
        <div className="CharitySearchResult__actions">
          { props.selectAction }
          <Icon icon="arrow-right" fixedWidth />
        </div>
      </SearchResult>
    );
  }
});
