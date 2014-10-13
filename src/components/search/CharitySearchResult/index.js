/** @jsx React.DOM */
"use strict";

var _                           = require('lodash');
var React                       = require('react');
var SearchResult                = require('../SearchResult');
var Icon                        = require('../../helpers/Icon');

module.exports = React.createClass({
  location: function() {
    return _.compact([this.props.result.locality, this.props.result.region]).join(', ');
  },
  render: function() {
    var location = this.location();

    return this.transferPropsTo(
      <SearchResult>
        <div className='CharitySearchResult__avatar'><Icon icon='heart-o' fixedWidth={true} /></div>
        <div className='CharitySearchResult__content'>
          <div className='CharitySearchResult__header'>{this.props.result.name}</div>
          <p className='CharitySearchResult__description'>{this.props.result.description}</p>
          <div className='CharitySearchResult__footer'>{location}</div>
        </div>
        <div className='CharitySearchResult__actions'>
          {this.props.selectAction}
          <Icon icon="arrow-right" fixedWidth={true} />
        </div>
      </SearchResult>
    );
  }
});
