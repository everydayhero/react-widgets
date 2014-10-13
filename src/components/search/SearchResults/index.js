/** @jsx React.DOM */
"use strict";

var _     = require('lodash');
var React = require('react');
var SearchResult = require('../SearchResult');

module.exports = React.createClass({
  render: function() {
    var props = this.props;
    var Result = this.props.resultComponent || SearchResult;
    var results = _.map(this.props.results, function(result) {
      var key = 'Result' + result.id;
      return (
        <Result key={ key } onSelect={ props.onSelect } selectAction={ props.selectAction } result={ result } />
      );
    });

    if (_.isEmpty(results) && this.props.hasResults) {
      results = <p>{ this.props.emptyLabel }</p>;
    }

    return (
      <div className="SearchResults">
        { results }
      </div>
    );
  }
});
