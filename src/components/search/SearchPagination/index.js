import React from 'react';
import Icon from '../../helpers/Icon';

export default React.createClass({
  displayName: 'SearchPagination',

  propTypes: {
    count: React.PropTypes.number,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    totalPages: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      count: 0,
      page: 0,
      pageSize: 0,
      totalPages: 0
    };
  },

  onPageLeft: function() {
    this.props.onChange(this.props.page - 1);
  },

  onPageRight: function() {
    this.props.onChange(this.props.page + 1);
  },

  getCount: function() {
    var count = this.props.count;
    if (count >= 1000000) {
      return Math.floor(count / 1000000) + 'M+';
    }
    if (count >= 1000) {
      return Math.floor(count / 1000) + 'K+';
    }
    return count;
  },

  render: function() {
    if (this.props.totalPages <= 1) { return false; }

    var from = (this.props.page - 1) * this.props.pageSize + 1;
    var to = Math.min(from + this.props.pageSize - 1, this.props.count);

    var isFirstPage = this.props.page <= 1;
    var isLastPage = this.props.page >= this.props.totalPages;

    return (
      <div className="SearchPagination">
        <div className="SearchPagination__counter">
          <span className="SearchPagination__current">{ from } - { to } </span>
          <span className="SearchPagination__count">of { this.getCount() }</span>
        </div>
        <button type="button" className="SearchPagination__button--left" onClick={ this.onPageLeft } disabled={ isFirstPage }>
          <Icon icon="chevron-left"/>
        </button>
        <button type="button" className="SearchPagination__button--right" onClick={ this.onPageRight } disabled={ isLastPage }>
          <Icon icon="chevron-right"/>
        </button>
      </div>
    );
  }
});
