/** @jsx React.DOM */
"use strict";

var _                           = require('lodash');
var React                       = require('react');
var SearchInput                 = require('../SearchInput');
var SearchPagination            = require('../SearchPagination');
var SearchResults               = require('../SearchResults');
var CharitySearchResult         = require('../CharitySearchResult');
var I18nMixin                   = require('../../mixins/I18n');
var Overlay                     = require('../../helpers/Overlay');
var charities                   = require('../../../api/charities');
var routes                      = require('../../../api/routes');

var giveCampaignUid = {
  'au': 'au-0',
  'nz': 'nz-0',
  'uk': 'gb-0',
  'us': 'us-0'
};

var performSearch = _.debounce(function(query, callback) {
  if (query.searchTerm) {
    charities.findAll(query, callback);
  } else {
    callback(null);
  }
}, 500);

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "CharitySearch",
  propTypes: {
    action: React.PropTypes.oneOf(['donate', 'fundraise', 'custom']).isRequired,
    callback: React.PropTypes.func,
    campaignUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'nz', 'uk', 'us']).isRequired,
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      campaignUid: '',
      defaultI18n: {
        title: 'Search for a Charity',
        donateAction: 'Give to this Charity',
        fundraiseAction: 'Fundraise for this Charity',
        customAction: 'Select',
        emptyLabel: 'No results'
      }
    }
  },

  getInitialState: function() {
    return {
      count: 0,
      page: 1,
      pageSize: 10,
      results: [],
      totalPages: 0,
      searching: false,
      hasResults: false
    };
  },

  getCampaignUid: function() {
    var campaign = this.props.campaignUid;
    if (!campaign && this.props.action == 'fundraise') {
      campaign = giveCampaignUid[this.props.country];
    }
    return campaign;
  },

  pageChanged: function(page) {
    this.search(this.state.searchTerm, page);
  },

  searchTermChanged: function(searchTerm) {
    this.search(searchTerm, 1);
  },

  search: function(searchTerm, page) {
    this.setState({
      searchTerm: searchTerm,
      searching: true,
      hasResults: false
    });

    performSearch({
      country: this.props.country,
      searchTerm: searchTerm,
      campaignUids: [this.getCampaignUid()],
      page: page || 1,
      pageSize: this.state.pageSize
    }, this.updateResults);
  },

  updateResults: function(results) {
    if (this.refs.scroll) {
      this.refs.scroll.getDOMNode().scrollTop = 0;
    }

    if (results) {
      this.setState({
        count: results.meta.pagination.count,
        page: results.meta.pagination.current_page,
        results: results.charities,
        totalPages: results.meta.pagination.total_pages,
        searching: false,
        hasResults: true
      });
    } else {
      this.setState({
        count: 0,
        page: 1,
        results: [],
        totalPages: 0,
        searching: false,
        hasResults: false
      });
    }
  },

  selectResult: function(result) {
    if (this.props.action == 'custom') {
      this.props.callback(result);
    } else {
      var redirect;
      switch(this.props.action) {
        case 'donate':
          redirect = routes('donate', { country: this.props.country, id: result.uid.split('-')[1] });
          break;
        case 'fundraise':
          redirect = routes('fundraise', { country: this.props.country, slug: result.slug });
          break;
      }
      document.location = redirect;
    }
    this.props.onClose();
  },

  selectAction: function() {
    return this.t(this.props.action + 'Action');
  },

  render: function() {
    var title = this.t('title');
    var selectAction = this.selectAction();

    var header = (
      <div className="CharitySearch__header">
        <div className="CharitySearch__input">
          <SearchInput
            onChange={ this.searchTermChanged }
            autoFocus={ this.props.autoFocus }
            label={ title }
            isQueryInProgress= { this.state.searching } />
        </div>
        <SearchPagination
          onChange={ this.pageChanged }
          count={ this.state.count }
          page={ this.state.page }
          pageSize={ this.state.pageSize }
          totalPages={ this.state.totalPages } />
      </div>
    );

    var results = (
      <SearchResults
        results={ this.state.results }
        resultComponent={ CharitySearchResult }
        onSelect={ this.selectResult }
        selectAction={ selectAction }
        emptyLabel={ this.t('emptyLabel') }
        hasResults={ this.state.hasResults } />
    );

    return (
      <Overlay onClose={ this.props.onClose }>
        <div className='Search__header'>
          { header }
        </div>
        <div ref="scroll" className={ 'Search__body' + (this.state.totalPages > 1 ? ' Search__body--paginated' : '') }>
          { results }
        </div>
      </ Overlay>
    );
  }
});
