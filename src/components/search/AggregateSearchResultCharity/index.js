"use strict";

var _             = require('lodash');
var React         = require('react');
var Icon          = require('../../helpers/Icon');
var I18n          = require('../../mixins/I18n');
var AggregateSearchResult = require('../AggregateSearchResult');

module.exports = React.createClass({
  displayName: 'AggregateSearchResultCharity',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        numSupporters: '{count:0,0} Supporters'
      }
    };
  },

  render: function() {
    var t = this.t;
    var props = this.props;
    var result = props.result;
    var charity = result;

    var logo;
    if (charity.logo_url) {
      logo = (
        <div className="AggregateSearchResultCharity__logo">
          <img src={ charity.logo_url } />
        </div>
      );
    } else {
      logo = (
        <div className='AggregateSearchResultCharity__avatar'>
          <Icon icon='heart-o' fixedWidth={ true } />
        </div>
      );
    }

    var name =
      <span className="AggregateSearchResultCharity__name">{ charity.name }</span>;

    var supporters = charity.page_count >= 20 &&
      <span className='AggregateSearchResultCharity__supporters'>
        { t('numSupporters', { count: charity.page_count }) }
      </span>;

    return (
      <AggregateSearchResult url={ charity.url }>
        { logo }
        <div className='AggregateSearchResultCharity__content'>
          <div className='AggregateSearchResultCharity__header'>
            { name }
          </div>
          <div className='AggregateSearchResultCharity__subheader'>
            { supporters }
          </div>
          <p className='AggregateSearchResultCharity__description'>{ charity.description }</p>
        </div>
      </AggregateSearchResult>
    );
  }
});
