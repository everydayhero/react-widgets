"use strict";

var _                           = require('lodash');
var React                       = require('react');
var SearchModal                 = require('../SearchModal');
var PageSearchResult            = require('../PageSearchResult');
var I18nMixin                   = require('../../mixins/I18n');
var pages                       = require('../../../api/pages');
var campaigns                   = require('../../../api/campaigns');

module.exports = React.createClass({
  displayName: 'PageSearchModal',

  mixins: [I18nMixin],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    searchTerm: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
    pageType: React.PropTypes.oneOf(['all', 'team', 'user']),
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      searchTerm: '',
      campaignUid: '',
      charityUid: '',
      defaultI18n: {
        title: 'Search for a Supporter Page',
        selectAction: 'Support',
        emptyLabel: "We couldn't find any matching Supporter Pages."
      },
      pageSize: 10,
      pageType: 'all',
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.searchTerm,
      cancelRequest: null,
      results: null,
      isSearching: false,
      pagination: {
        count: 0,
        page: 1,
        pageSize: 1,
        totalPages: 0,
      }
    };
  },

  getBlankState: function() {
    return {
      searchTerm: '',
      cancelRequest: null,
      results: null,
      isSearching: false,
      pagination: {
        count: 0,
        page: 1,
        pageSize: 1,
        totalPages: 0,
      }
    };
  },

  componentDidMount: function() {
    if (this.state.searchTerm) {
      this.search(this.state.searchTerm, 1);
    }
  },

  pageChanged: function(page) {
    this.search(this.state.searchTerm, page);
  },

  inputChanged: function(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    });

    this.search(searchTerm, 1);
  },

  search: _.debounce(function(searchTerm, page) {
    if (!searchTerm) {
      return this.updateResults(null);
    }

    if (this.state.cancelRequest) {
      this.state.cancelRequest();
    }

    var cancelRequest = pages.search({
      country: this.props.country,
      searchTerm: searchTerm,
      campaignUid: this.props.campaignUid,
      charityUid: this.props.charityUid,
      page: page || 1,
      pageSize: this.props.pageSize,
      pageType: this.props.pageType,
    }, this.updateResults);

    this.setState({
      isSearching: true,
      cancelRequest: cancelRequest
    });
  }, 300),

  updateResults: function(results) {
    if (results) {
      this.setState({
        cancelRequest: null,
        results: results.pages,
        isSearching: false,
        pagination: {
          count: results.meta.pagination.count,
          page: results.meta.pagination.current_page,
          pageSize: this.props.pageSize,
          totalPages: results.meta.pagination.total_pages
        }
      });
    } else {
      this.setState(this.getBlankState());
    }
  },

  selectHandler: function(page) {
    this.props.onClose();

    if(this.props.onSelect) {
      this.props.onSelect(page);
    } else {
      window.location = page.url;
    }
  },

  render: function() {
    return (
      <SearchModal
        autoFocus={ this.props.autoFocus }
        i18n={ this.getI18n() }
        isSearching={ this.state.isSearching }
        onClose={ this.props.onClose }
        onInputChange={ this.inputChanged }
        onPageChange={ this.pageChanged }
        onSelect={ this.selectHandler }
        pagination={ this.state.pagination }
        results={ this.state.results }
        resultComponent={ PageSearchResult }
        value={ this.state.searchTerm } />
    );
  }
});
