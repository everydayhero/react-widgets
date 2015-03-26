"use strict";

var _                           = require('lodash');
var React                       = require('react');
var SearchResult                = require('../SearchResult');
var Icon                        = require('../../helpers/Icon');
var pages                       = require('../../../api/pages');

module.exports = React.createClass({
  displayName: 'PageSearchResult',

  propTypes: {
    onSelect: React.PropTypes.func,
    result: React.PropTypes.object.isRequired,
    selectAction: React.PropTypes.string.isRequired
  },

  render: function() {
    var props = this.props;
    var page = props.result;
    var campaignName = !pages.isGivePage(page) && page.campaign.name;

    return (
      <SearchResult onSelect={ props.onSelect } result={ page }>
        <div className='PageSearchResult__avatar'>
          <img src={ page.image.medium_image_url } />
        </div>
        <div className='PageSearchResult__content'>
          <div className='PageSearchResult__header'>
            { page.name } <span className="PageSearchResult__subheader"> – { page.supporter.name }</span>
          </div>
          <p className='PageSearchResult__description'>{ page.charity.name }</p>
          <div className='PageSearchResult__footer'>{ campaignName }</div>
        </div>
        <div className='PageSearchResult__actions'>
          { props.selectAction }
          <Icon icon="arrow-right" fixedWidth={ true } />
        </div>
      </SearchResult>
    );
  }
});
