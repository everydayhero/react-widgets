"use strict";

var React                   = require('react');
var LeaderboardPagingButton = require('../LeaderboardPagingButton');

module.exports = React.createClass({
  displayName: 'LeaderboardPaging',

  render: function() {
    var props = {
      pageCount: this.props.pageCount,
      currentPage: this.props.currentPage
    };

    return (
      <div className="LeaderboardPaging">
        <LeaderboardPagingButton type="prev" action={ this.props.prevPage } { ...props } />
        <LeaderboardPagingButton type="next" action={ this.props.nextPage } { ...props } />
      </div>
    );
  }
});
