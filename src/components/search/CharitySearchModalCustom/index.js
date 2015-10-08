"use strict";

var _                   = require('lodash');
var React               = require('react');
var SearchModal         = require('../SearchModal');
var CharitySearchResult = require('../CharitySearchResult');
var I18nMixin           = require('../../mixins/I18n');
var apis = {
  frol: require('../../../api/frolCharities')
};

module.exports = React.createClass({
  displayName: 'CharitySearchModalFROL',

  mixins: [I18nMixin],

  propTypes: {
    action: React.PropTypes.oneOf(['visit', 'donate', 'fundraise', 'custom']),
    autoFocus: React.PropTypes.bool,
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    api: React.PropTypes.oneOf(['frol'])
  },

  getDefaultProps: function() {
    return {
      action: 'visit',
      autoFocus: true,
      campaignUid: '',
      campaignSlug: null,
      defaultI18n: {
        title: 'Search for a Charity',
        visitAction: 'Visit Charity',
        donateAction: 'Give to this Charity',
        fundraiseAction: 'Fundraise for this Charity',
        emptyLabel: "We couldn't find any matching Charities."
      },
      pageSize: 10,
      api: 'frol'
    };
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

  componentDidMount: function() {
    this.search('', 1);
  },

  pageChanged: function(page) {
    this.search(this.state.searchTerm, page);
  },

  inputChanged: function(searchTerm) {
    this.search(searchTerm, 1);
  },

  search: function(searchTerm, page) {
    if (this.state.cancelRequest) {
      this.state.cancelRequest();
    }

    var cancelRequest = apis[this.props.api].search({
      searchTerm: searchTerm,
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
        results: results.charities,
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
    window.location = result.charity.url;
  },

  selectAction: function() {
    return this.t(this.props.action + 'Action');
  },

  getResults: function() {
    var props = this.props;
    var results = this.state.results;

    return results && results.map(function(charity) {
      return {
        id: charity.id,
        charity: charity,
        url: charity.url
      };
    });
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
        results={ this.getResults() }
        resultComponent={ CharitySearchResult }
        selectAction={ this.selectAction() } />
    );
  }
});
