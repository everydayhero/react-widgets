/** @jsx React.DOM */
"use strict";

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
    campaignUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'nz', 'uk', 'us']).isRequired,
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      campaignUid: '',
      defaultI18n: {
        title: 'Search for a Supporter',
        selectAction: 'Support'
      },
      pageSize: 10
    }
  },

  getInitialState: function() {
    return {
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

  getCampaignUid: function() {
    return this.props.campaignUid;
  },

  pageChanged: function(page) {
    this.search(this.state.searchTerm, page);
  },

  inputChanged: function(searchTerm) {
    this.search(searchTerm, 1);
  },

  search: function(searchTerm, page) {
    if (!searchTerm) {
      return this.updateResults(null);
    }

    if (this.state.cancelRequest) {
      this.state.cancelRequest();
    }

    var cancelRequest = pages.search({
      country: this.props.country,
      searchTerm: searchTerm,
      campaignUid: this.getCampaignUid(),
      page: page || 1,
      pageSize: this.props.pageSize
    }, this.updateResults);

    this.setState({
      searchTerm: searchTerm,
      isSearching: true,
      cancelRequest: cancelRequest
    });
  },

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
      this.setState(this.getInitialState());
    }
  },

  selectHandler: function(result) {
    if (this.props.onSelect) {
      this.props.onSelect(result);
    } else {
      document.location = result.url;
    }
    this.props.onClose();
  },

  selectAction: function() {
    return this.t(this.props.action + 'Action');
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
        selectAction={ this.selectAction() } />
    );
  }
});
