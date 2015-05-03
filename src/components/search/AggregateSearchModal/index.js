"use strict";

var _                           = require('lodash');
var React                       = require('react');
var cx                          = require('react/lib/cx');
var I18n                        = require('../../mixins/I18n');
var Input                       = require('../../forms/Input');
var Icon                        = require('../../helpers/Icon');
var Overlay                     = require('../../helpers/Overlay');

var searchAPI = {
  campaigns: require('../../../api/campaigns').search,
  charities: require('../../../api/charities').search,
  pages: require('../../../api/pages').search,
  all: require('../../../api/search').aggregate
};

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
        emptyLabel: {
          pages: "We couldn't find any matching supporters",
          charities: "We couldn't find any matching charities",
          campaigns: "We couldn't find any matching events",
          all: "We couldn't find any matching supporters, charities or events"
        },
        noMore: 'No more results',
        loadMore: 'Show more',
        loadingMore: 'Searching',
        filterTypes: {
          pages: 'Supporters',
          charities: 'Charities',
          campaigns: 'Events'
        }
      },
      pageSize: 10
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.searchTerm,
      cancelRequest: function() {},
      results: null,
      isSearching: false,
      filter: 'all'
    };
  },

  componentDidMount: function() {
    if (this.state.searchTerm) {
      this.search();
    }
  },

  componentWillUnmount: function() {
    this.state.cancelRequest();
  },

  inputChanged: function(searchTerm) {
    this.state.cancelRequest();
    this.setState({ searchTerm: searchTerm }, this.delayedSearch);
  },

  delayedSearch: _.debounce(function(page) {
    this.search(page);
  }, 300),

  search: function(page) {
    this.state.cancelRequest();

    if (!this.isMounted()) {
      return;
    }

    if (!this.state.searchTerm) {
      return this.updateResults(null);
    }

    var cancelRequest = searchAPI[this.state.filter]({
      country: this.props.country,
      searchTerm: this.state.searchTerm,
      page: page || 1,
      pageSize: this.props.pageSize,
      minimumScore: 0.1
    }, this.updateResults);

    this.setState({
      results: page > 1 ? this.state.results : [],
      isSearching: true,
      cancelRequest: cancelRequest
    });
  },

  updateResults: function(data) {
    if (data) {
      var pagination = data.meta.pagination;
      var results = data[this.state.filter] || data.results;

      if (!pagination.first_page) {
        results = this.state.results.concat(results);
        results = _.uniq(results, function(result) {
          return result._type + result.id;
        });
      }

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

  setFilter: function (filter, event) {
    event.preventDefault();
    this.setState({ filter: filter }, this.search);
  },

  renderFilters: function() {
    var categories = _.map(this.t('filterTypes'), function(name, key) {
      var selected = key == this.state.filter;
      var classes = cx({
        'AggregateSearchModal__filters__type': true,
        'AggregateSearchModal__filters__type-selected': selected
      });
      return (
        <div className={ classes } key={ key } onClick={ this.setFilter.bind(this, selected ? 'all' : key) }>
          { selected && <Icon icon="chevron-right" /> }
          <div className="AggregateSearchModal__filters__type__name">{ name }</div>
          <div className="AggregateSearchModal__filters__type__results">0 results</div>
        </div>
      );
    }, this);

    return this.state.results && (
      <div className="AggregateSearchModal__filters">
       { categories}
      </div>
    );
  },

  renderEmpty: function () {
    return _.isEmpty(this.state.results) && (
      <p className="AggregateSearchModal__footer">
        { this.t(this.state.filter, { scope: 'emptyLabel' }) }
      </p>
    );
  },

  renderLoading: function () {
    return this.state.isSearching && (
      <p className="AggregateSearchModal__footer">
        { this.t('loadingMore') }<Icon icon="refresh"/>
      </p>
    );
  },

  renderLoadMore: function () {
    return !this.state.lastPage && (
      <p className="AggregateSearchModal__footer">
        <a href="#" onClick={ this.search.bind(this, this.state.currentPage + 1) }>{ this.t('loadMore') }</a>
      </p>
    );
  },

  renderNoMore: function () {
    return (
      <p className="AggregateSearchModal__footer">{ this.t('noMore') }</p>
    );
  },

  renderFooter: function () {
    return this.renderLoading() || this.renderEmpty() || this.renderLoadMore() || this.renderNoMore();
  },

  getResults: function() {
    var selectHandler = this.props.onClose;
    return _.map(this.state.results, function(result) {
      var El = resultTypes[result._type];
      return El && <El key={ result._type + result.id } result={ result } onSelect={ selectHandler }/>;
    });
  },

  renderResults: function() {
    return this.state.results && (
      <div className="AggregateSearchModal__results">
        { this.getResults() }
        { this.renderFooter() }
      </div>
    );
  },

  renderCloseButton: function () {
    return (
      <a href="#" className="AggregateSearchModal__close" onClick={ this.props.onClose }>&times;</a>
    );
  },

  renderInput: function () {
    return (
      <Input
        className='AggregateSearchModal__input'
        spacing="compact"
        autoFocus={ this.props.autoFocus }
        i18n={{ label: this.t('inputLabel'), name: 'aggregate_search_input' }}
        output={ this.inputChanged }
        showIcon={ true }
        icon={ this.state.isSearching ? 'refresh' : '' }
        value={ this.state.searchTerm } />
    );
  },

  render: function() {
    return (
      <Overlay className="AggregateSearchModal__overlay" onClose={ this.props.onClose } showCloseButton={ false }>
        <div className='AggregateSearchModal__header'>
          <span className="AggregateSearchModal__title">{ this.t('title') }</span>
          { this.renderCloseButton() }
          { this.renderInput() }
        </div>
        <div ref="body" className="AggregateSearchModal__body">
          <div className="AggregateSearchModal__content">
            { this.renderFilters() }
            { this.renderResults() }
          </div>
        </div>
      </ Overlay>
    );
  }
});