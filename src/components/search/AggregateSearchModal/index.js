'use strict';

var _       = require('lodash');
var async   = require('async');
var React   = require('react');
var cx      = require('classnames');
var I18n    = require('../../mixins/I18n');
var Input   = require('../../forms/Input');
var Icon    = require('../../helpers/Icon');
var Overlay = require('../../helpers/Overlay');

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
    minimumScore: React.PropTypes.shape({
      all: React.PropTypes.number,
      other: React.PropTypes.number
    }),
    searchType: React.PropTypes.oneOf(['campaigns', 'charities', 'pages', 'all']),
    charityUids: React.PropTypes.array,
    charityUuids: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      searchTerm: '',
      defaultI18n: {
        title: 'Search',
        inputLabel: 'Enter keywords',
        campaignAction: 'Get Started',
        charityAction: 'Visit Charity',
        supporterAction: 'Support',
        emptyLabel: {
          pages: 'We couldn\'t find any matching supporters',
          charities: 'We couldn\'t find any matching charities',
          campaigns: 'We couldn\'t find any matching events',
          all: 'We couldn\'t find any matching supporters, charities or events'
        },
        noMore: 'No more results',
        loadMore: 'Show more',
        searching: 'Searching',
        filterTypes: {
          pages: 'Supporters',
          charities: 'Charities',
          campaigns: 'Events'
        },
        numResults: {
          one: '{count} result',
          other: '{count} results'
        }
      },
      minimumScore: {
        all: 0.15,
        other: 0.15
      },
      pageSize: 10,
      searchType: 'all',
      charityUids: [],
      charityUuids: []
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.searchTerm,
      cancelSearch: function() {},
      cancelSearchCounts: function() {},
      results: null,
      isSearching: false,
      filter: this.props.searchType,
      counts: {}
    };
  },

  componentDidMount: function() {
    if (this.state.searchTerm) {
      this.search();
      this.searchCounts();
    }
  },

  componentWillUnmount: function() {
    this.state.cancelSearch();
    this.state.cancelSearchCounts();
  },

  inputChanged: function(searchTerm) {
    this.state.cancelSearch();
    this.state.cancelSearchCounts();
    this.setState({ searchTerm: searchTerm }, this.delayedSearch);
  },

  delayedSearch: _.debounce(function() {
    if (this.isMounted()) {
      if (this.state.searchTerm) {
        this.search();
        this.searchCounts();
      } else {
        this.clearResults();
      }
    }
  }, 300),

  search: function(page) {
    this.state.cancelSearch();

    var cancelSearch = searchAPI[this.state.filter]({
      country: this.props.country,
      searchTerm: this.state.searchTerm,
      page: page || 1,
      pageSize: this.props.pageSize,
      minimumScore: this.props.minimumScore[this.state.filter] || this.props.minimumScore.other,
      charityUids: this.props.charityUids,
      charityUuids: this.props.charityUuids
    }, this.updateResults);

    this.setState({
      results: page > 1 ? this.state.results : [],
      isSearching: true,
      searchPage: page || 1,
      cancelSearch: cancelSearch
    });
  },

  clearResults: function() {
    this.setState({
      results: null,
      isSearching: false,
      counts: {}
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

      if (this.refs.body && pagination.current_page === 1) {
        this.refs.body.scrollTop = 0;
      }
    } else {
      this.search(this.state.searchPage);
    }
  },

  searchCounts: function() {
    var cancel = false;

    this.setState({
      counts: {},
      cancelSearchCounts: function() { cancel = true; }
    });

    var searchParams = {
      country: this.props.country,
      searchTerm: this.state.searchTerm,
      page: 1,
      pageSize: 1,
      minimumScore: this.props.minimumScore.other,
      charityUids: this.props.charityUids,
      charityUuids: this.props.charityUuids
    };

    var types = this.props.searchType === 'all' ? ['campaigns', 'charities', 'pages'] : [this.props.searchType];

    async.map(types, function(type, callback) {
      searchAPI[type](searchParams, function(data) {
        callback(data ? null : 'error', data && data.meta.pagination.count);
      });
    }, function(error, results) {
      if (!cancel) {
        this.updateCounts(error ? null : _.zipObject(types, results));
      }
    }.bind(this));
  },

  updateCounts: function(counts) {
    if (counts) {
      this.setState({ counts: counts });
    } else {
      var timer = setTimeout(this.searchCounts, 5000);
      this.setState({ cancelSearchCounts: function() { clearTimeout(timer); }});
    }
  },

  setFilter: function(filter) {
    this.setState({ filter: filter }, this.search);
  },

  handleSelect: function(res) {
    this.props.onClose();

    if (this.props.onSelect) {
      this.props.onSelect(res);
    } else {
      window.location = res.url;
    }
  },

  renderFilters: function() {
    var searchType = this.props.searchType;
    var filterTypes = this.t('filterTypes');
    var matchSearchType = function(item) {
      return item === filterTypes[searchType];
    };

    var filters = searchType === 'all' ? filterTypes : _.pick(filterTypes, matchSearchType);

    var categories = _.map(filters, function(name, type) {
      var selected = (type == this.state.filter);
      var classes = cx({
        'AggregateSearchModal__filters__type': true,
        'AggregateSearchModal__filters__type--selected': selected
      });

      var onClick = _.size(filters) > 1 && this.setFilter.bind(this, selected ? 'all' : type);
      var count = this.state.counts[type];
      var numResults = count >= 0 ? this.t('numResults', { count: count }) : this.t('searching');

      return (
        <div className={ classes } key={ type } onClick={ onClick }>
          { selected && <Icon icon="chevron-right" /> }
          <div className="AggregateSearchModal__filters__type__name">{ name }</div>
          <div className="AggregateSearchModal__filters__type__results">{ numResults }</div>
        </div>
      );
    }, this);

    return this.state.results && (
      <div className="AggregateSearchModal__filters">
        { categories }
      </div>
    );
  },

  renderEmpty: function() {
    return _.isEmpty(this.state.results) && (
      <p className="AggregateSearchModal__footer AggregateSearchModal__footer--empty">
        { this.t(this.state.filter, { scope: 'emptyLabel' }) }
      </p>
    );
  },

  renderLoading: function() {
    return this.state.isSearching && (
      <p className="AggregateSearchModal__footer AggregateSearchModal__footer--loading">
        { this.t('searching') }<Icon icon="refresh"/>
      </p>
    );
  },

  renderLoadMore: function() {
    return !this.state.lastPage && (
      <p className="AggregateSearchModal__footer">
        <a href="#" onClick={ this.search.bind(this, this.state.currentPage + 1) }>{ this.t('loadMore') }</a>
      </p>
    );
  },

  renderNoMore: function() {
    return (
      <p className="AggregateSearchModal__footer">{ this.t('noMore') }</p>
    );
  },

  renderFooter: function() {
    return this.renderLoading() || this.renderEmpty() || this.renderLoadMore() || this.renderNoMore();
  },

  getResults: function() {
    return _.map(this.state.results, function(result) {
      var El = resultTypes[result._type];
      return El && <El key={ result._type + result.id } result={ result } onSelect={ this.handleSelect } />;
    }, this);
  },

  renderResults: function() {
    return this.state.results && (
      <div className="AggregateSearchModal__results">
        { this.getResults() }
        { this.renderFooter() }
      </div>
    );
  },

  renderCloseButton: function() {
    return (
      <div className="AggregateSearchModal__close" onClick={ this.props.onClose }>&times;</div>
    );
  },

  renderInput: function() {
    return (
      <Input
        className="AggregateSearchModal__input"
        spacing="compact"
        autoFocus={ this.props.autoFocus }
        i18n={{ label: this.t('inputLabel'), name: 'aggregate_search_input' }}
        output={ this.inputChanged }
        showIcon
        icon={ this.state.isSearching ? 'refresh' : '' }
        value={ this.state.searchTerm } />
    );
  },

  render: function() {
    return (
      <Overlay className="AggregateSearchModal__overlay" onClose={ this.props.onClose } showCloseButton={ false }>
        <div className="AggregateSearchModal__header">
          <span className="AggregateSearchModal__title">{ this.t('title') }</span>
          { this.renderCloseButton() }
          { this.renderInput() }
          { this.renderFilters() }
        </div>
        <div ref="body" className="AggregateSearchModal__body">
          <div className="AggregateSearchModal__content">
            { this.renderResults() }
          </div>
        </div>
      </Overlay>
    );
  }
});
