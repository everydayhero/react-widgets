"use strict";

var _                           = require('lodash');
var React                       = require('react');
var I18n                        = require('../../mixins/I18n');
var Input                       = require('../../forms/Input');
var Icon                        = require('../../helpers/Icon');
var Overlay                     = require('../../helpers/Overlay');
var searchAPI                   = require('../../../api/search');
var charitiesAPI                = require('../../../api/charities');
var campaignsAPI                = require('../../../api/campaigns');
var pagesAPI                    = require('../../../api/pages');

var resultTypes = {
  campaign: require('../AggregateSearchResultCampaign'),
  charity: require('../AggregateSearchResultCharity'),
  page: require('../AggregateSearchResultPage')
};

module.exports = React.createClass({
  displayName: 'AggregateSearchModal',

  mixins: [I18n],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    searchTerm: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      searchTerm: '',
      defaultI18n: {
        title: 'Search',
        inputLabel: 'Search for a supporter, charity or event',
        campaignAction: 'Get Started',
        charityAction: 'Visit Charity',
        supporterAction: 'Support',
        emptyLabel: "We couldn't find any matching supporters, charities or events.",
        noMore: "No more results",
        loadMore: "Show more",
        loadingMore: "Searching"
      },
      pageSize: 10
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.searchTerm,
      cancelRequest: function() {},
      results: null,
      isSearching: false
    };
  },

  componentWillMount: function() {
    if (this.props.searchTerm) {
      this.aggregateSearch(this.props.searchTerm, 1);
    }
  },

  componentWillUnmount: function() {
    this.state.cancelRequest();
  },

  keyHandler: function(event) {
    if (event.key === 'Escape') {
      this.props.onClose(event);
    }
  },

  inputChanged: function(searchTerm) {
    this.state.cancelRequest();

    this.setState({
      searchTerm: searchTerm
    });

    this.delayedChange(searchTerm, 1);
  },

  delayedChange: _.debounce(function(searchTerm, page) {
    this.aggregateSearch(searchTerm, page);
  }, 300),

  aggregateSearch: function(searchTerm, page) {
    if (!searchTerm) {
      this.updateResults(null);
      return;
    }

    var cancelRequest = searchAPI.aggregate({
      country: this.props.country,
      searchTerm: searchTerm,
      page: page || 1,
      pageSize: this.props.pageSize,
      minimumScore: 0.1
    }, this.updateResults);

    this.setState({
      results: null,
      isSearching: true,
      cancelRequest: cancelRequest
    });
  },

  loadMore: function() {
    var cancelRequest = searchAPI.aggregate({
      country: this.props.country,
      searchTerm: this.state.searchTerm,
      page: this.state.currentPage + 1,
      pageSize: this.props.pageSize,
      minimumScore: 0.1
    }, this.updateResults);

    this.setState({
      isSearching: true,
      cancelRequest: cancelRequest
    });
  },

  updateResults: function(data) {
    if (data) {
      var pagination = data.meta.pagination;
      var results = pagination.first_page ? data.results : this.state.results.concat(data.results);

      this.setState({
        results: results,
        isSearching: false,
        lastPage: pagination.last_page,
        currentPage: pagination.current_page
      });
    } else {
      this.setState({
        results: null,
        isSearching: false,
        lastPage: true,
        currentPage: 0
      });
    }
  },

  renderFilters: function() {
    return false;
  },

  renderResultsEmpty: function () {
    return <p className="AggregateSearchModal__results__footer">{ this.t('emptyLabel') }</p>;
  },

  renderResultsLoading: function () {
    return (
      <p className="AggregateSearchModal__results__footer">
        { this.t('loadingMore') }<Icon icon="refresh"/>
      </p>
    );
  },

  renderResultsLoadMore: function () {
    return (
      <p className="AggregateSearchModal__results__footer">
        <a href="#" onClick={ this.loadMore }>{ this.t('loadMore') }</a>
      </p>
    );
  },

  renderResultsNoMore: function () {
    return <p className="AggregateSearchModal__results__footer">{ this.t('noMore') }</p>;
  },

  renderResultsFooter: function () {
    if (this.state.isSearching) {
      return this.renderResultsLoading();
    }

    if (this.state.lastPage) {
      return this.renderResultsNoMore();
    }

    return this.renderResultsLoadMore();
  },

  renderResults: function() {
    if (!this.state.results) {
      return;
    }

    if (_.isEmpty(this.state.results)) {
      return this.renderResultsEmpty();
    }

    var results = this.state.results.map(function(result) {
      var El = resultTypes[result._type];
      return El && <El key={ result._type + result.id } result={ result } />;
    });

    return (
      <div className="AggregateSearchModal__results">
        { results }
        { this.renderResultsFooter() }
      </div>
    );
  },

  render: function() {
    var props = this.props;

    var title = <span className="AggregateSearchModal__title">{ this.t('title') }</span>;

    var closeButton =
      <a href="#" className="AggregateSearchModal__close" onClick={ this.props.onClose }><Icon icon="times" /></a>;

    var input =
      <Input
        className='AggregateSearchModal__input'
        spacing="compact"
        autoFocus={ props.autoFocus }
        i18n={{ label: this.t('inputLabel'), name: 'aggregate_search_input' }}
        output={ this.inputChanged }
        showIcon={ true }
        icon={ this.state.isSearching ? 'refresh' : '' }
        value={ this.state.searchTerm } />;

    return (
      <Overlay className="AggregateSearchModal__overlay">
        <div className='AggregateSearchModal__header' onKeyDown={ this.keyHandler }>
          { title }
          { closeButton }
          { input }
        </div>
        <div ref="body" className="AggregateSearchModal__body">
          { this.renderFilters() }
          { this.renderResults() }
        </div>
      </ Overlay>
    );
  }
});
