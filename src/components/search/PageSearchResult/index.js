/** @jsx React.DOM */
"use strict";

var _                           = require('lodash');
var React                       = require('react');
var SearchResult                = require('../SearchResult');
var Icon                        = require('../../helpers/Icon');
var pages                       = require('../../../api/pages');

module.exports = React.createClass({
  displayName: 'PageSearchResult',

  render: function() {
    var props = this.props;
    var page = props.result;
    var campaignName = !pages.isGivePage(page) && page.campaign.name;

    return this.transferPropsTo(
      <SearchResult>
        <div className='PageSearchResult__avatar'>
          <img src={ page.image.small_image_url } />
        </div>
        <div className='PageSearchResult__content'>
          <div className='PageSearchResult__header'>{ page.name }</div>
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
