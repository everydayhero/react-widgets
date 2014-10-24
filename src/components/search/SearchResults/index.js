/** @jsx React.DOM */
"use strict";

var _             = require('lodash');
var React         = require('react');
var SearchResult  = require('../SearchResult');
var I18nMixin     = require('../../mixins/I18n');

module.exports = React.createClass({
  displayName: 'SearchResults',

  mixins: [I18nMixin],

  propTypes: {
    results: React.PropTypes.array,
    resultComponent: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selectAction: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      results: null,
      resultComponent: SearchResult,
      defaultI18n: {
        selectAction: 'Select',
        emptyLabel: 'No results'
      }
    };
  },

  getResults: function() {
    if (this.props.results && _.isEmpty(this.props.results)) {
      return <p className="SearchResults--empty">{ this.t('emptyLabel') }</p>;
    }

    var props = this.props;
    var Result = props.resultComponent;
    var selectAction = props.selectAction || this.t('selectAction');

    return _.map(this.props.results || [], function(result) {
      var key = 'Result' + result.id;
      return (
        <Result key={ key } onSelect={ props.onSelect } selectAction={ selectAction } result={ result } />
      );
    });
  },

  render: function() {
    return (
      <div className="SearchResults">
        { this.getResults() }
      </div>
    );
  }
});
