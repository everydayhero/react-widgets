import React from 'react';
import SearchInput from '../SearchInput';
import SearchPagination from '../SearchPagination';
import SearchResults from '../SearchResults';
import I18nMixin from '../../mixins/I18n';
import Overlay from '../../helpers/Overlay';

export default React.createClass({
  displayName: 'SearchModal',

  mixins: [I18nMixin],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    i18n: React.PropTypes.object,
    isSearching: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
    pagination: React.PropTypes.object,
    results: React.PropTypes.arrayOf(React.PropTypes.object),
    resultComponent: React.PropTypes.func.isRequired,
    selectAction: React.PropTypes.string,
    searchTerm: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      defaultI18n: {
        title: 'Search'
      }
    };
  },

  componentWillUpdate: function(nextProps) {
    if (this.refs.body && this.props.results !== nextProps.results) {
      this.refs.body.scrollTop = 0;
    }
  },

  render: function() {
    var props = this.props;
    var bodyClasses = 'SearchModal__body';

    var input =
      (<SearchInput
        className="SearchModal__input"
        autoFocus={ props.autoFocus }
        label={ this.t('title') }
        onChange={ props.onInputChange }
        isSearching= { props.isSearching }
        searchTerm={ this.props.searchTerm } />);

    var pagination = false;
    if (props.pagination && props.pagination.totalPages > 1) {
      bodyClasses = bodyClasses + ' SearchModal__body--paginated';
      pagination =
        (<SearchPagination
          onChange={ props.onPageChange }
          count={ props.pagination.count }
          page={ props.pagination.page }
          pageSize={ props.pagination.pageSize }
          totalPages={ props.pagination.totalPages } />);
    }

    var results =
      (<SearchResults
        i18n={ this.getI18n() }
        onSelect={ props.onSelect }
        results={ props.results }
        resultComponent={ props.resultComponent }
        selectAction={ props.selectAction } />);

    return (
      <Overlay onClose={ props.onClose }>
        <div className="SearchModal__header">
          { input }
          { pagination }
        </div>
        <div ref="body" className={ bodyClasses }>
          { results }
        </div>
      </ Overlay>
    );
  }
});
