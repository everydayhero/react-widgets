'use strict';

var React                       = require('react');
var SearchModal                 = require('../SearchModal');
var PageSearchResult            = require('../PageSearchResult');
var I18nMixin                   = require('../../mixins/I18n');
var pages                       = require('../../../api/pages');

module.exports = React.createClass({
  displayName: 'PageSearchModal',

  mixins: [I18nMixin],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    campaignUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    action: React.PropTypes.oneOf(['visit', 'custom']),
    onSelect: React.PropTypes.func,
    resizeCallback: React.PropTypes.func,
    pageType: React.PropTypes.oneOf(['all', 'team', 'user']),
    groupValues: React.PropTypes.array,
    searchTerm: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      action: 'visit',
      autoFocus: true,
      campaignUid: '',
      charityUid: '',
      groupValues: [],
      resizeCallback: function() {},
      defaultI18n: {
        title: 'Search for a Supporter Page',
        selectAction: 'Support',
        emptyLabel: "We couldn't find any matching Supporter Pages."
      },
      isSearching: false,
      pageSize: 10,
      pageType: 'all'
    };
  },

  componentDidMount: function() {
    if (this.props.searchTerm) {
      this.search(this.props.searchTerm);
    }

    this.props.resizeCallback();
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
      campaignUid: this.props.campaignUid,
      charityUid: this.props.charityUid,
      page: page || 1,
      pageSize: this.props.pageSize,
      pageType: this.props.pageType,
      groupValue: this.props.groupValues
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

    this.props.resizeCallback();
  },

  onClose: function() {
    this.props.onClose();
    this.props.resizeCallback();
  },

  selectHandler: function(event, result) {
    this.onClose();

    if (this.props.action === 'custom' && this.props.onSelect) {
      event.preventDefault();
      this.props.onSelect(result);
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
        searchTerm={ this.props.searchTerm } />
    );
  }
});
