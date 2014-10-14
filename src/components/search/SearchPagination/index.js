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
    if (this.props.totalPages <= 1) { return false; }

    var from = (this.props.page - 1) * this.props.pageSize + 1;
    var to = Math.min(from + this.props.pageSize - 1, this.props.count);

    var isFirstPage = this.props.page <= 1;
    var isLastPage = this.props.page >= this.props.totalPages;

    return (
      <div className='SearchPagination'>
        <div className="SearchPagination__counter">
          <span className="SearchPagination__current">{ from } - { to } </span>
          <span className="SearchPagination__count">of { this.props.count }</span>
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
