/** @jsx React.DOM */
var React = require('react');
var Icon = require('../../helpers/Icon');

module.exports = React.createClass({
  onPageLeft: function() {
    this.props.onChange(this.props.page - 1);
  },
  onPageRight: function() {
    this.props.onChange(this.props.page + 1);
  },
  render: function () {
    var count = this.props.count;

    if (this.props.totalPages <= 1) { return false; }

    var from = (this.props.page - 1) * this.props.pageSize;
    var to = from + this.props.pageSize;

    var isFirstPage = this.props.page <= 1;
    var isLastPage = this.props.page >= this.props.totalPages;

    from = from ? from : 1;
    to = (to > count) ? count : to;

    return (
      <div className='SearchPagination'>
        <div className="SearchPagination__counter">
          <span className="SearchPagination__current">{from} - {to} </span>
          <span className="SearchPagination__count">of {this.props.count}</span>
        </div>
        <button className='SearchPagination__button--left' onClick={ this.onPageLeft } disabled={ isFirstPage }>
          <Icon icon="chevron-left"/>
        </button>
        <button className='SearchPagination__button--right' onClick={ this.onPageRight } disabled={ isLastPage }>
          <Icon icon="chevron-right"/>
        </button>
      </div>
    );
  }
});
