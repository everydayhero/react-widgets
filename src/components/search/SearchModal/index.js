/** @jsx React.DOM */
"use strict";

var React                       = require('react');
var SearchInput                 = require('../SearchInput');
var SearchPagination            = require('../SearchPagination');
var SearchResults               = require('../SearchResults');
var I18nMixin                   = require('../../mixins/I18n');
var Overlay                     = require('../../helpers/Overlay');
var componentClass              = require('../../proptypes/componentClass');

module.exports = React.createClass({
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
    resultComponent: componentClass.isRequired,
    selectAction: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      autoFocus: true,
      defaultI18n: {
        title: 'Search'
      }
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.refs.body && this.props.results !== nextProps.results) {
      this.refs.body.getDOMNode().scrollTop = 0;
    }
  },

  render: function() {
    var props = this.props;
    var bodyClasses = 'SearchModal__body';

    var input =
      <SearchInput
        className='SearchModal__input'
        autoFocus={ props.autoFocus }
        label={ this.t('title') }
        onChange={ props.onInputChange }
        isSearching= { props.isSearching } />;

    var pagination = false;
    if (props.pagination && props.pagination.totalPages > 1) {
      bodyClasses = bodyClasses + ' SearchModal__body--paginated';
      pagination =
        <SearchPagination
          onChange={ props.onPageChange }
          count={ props.pagination.count }
          page={ props.pagination.page }
          pageSize={ props.pagination.pageSize }
          totalPages={ props.pagination.totalPages } />;
    }

    var results =
      <SearchResults
        i18n={ this.getI18n() }
        onSelect={ props.onSelect }
        results={ props.results }
        resultComponent={ props.resultComponent }
        selectAction={ props.selectAction } />;

    return (
      <Overlay onClose={ props.onClose }>
        <div className='SearchModal__header'>
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
