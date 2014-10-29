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
    results: React.PropTypes.arrayOf(React.PropTypes.object),
    resultComponent: function(props, propName, componentName) {
      if (!props[propName]) {
        return new Error('Required prop `' + propName + '` was not specified in `' + componentName + '`.');
      }
      if (!React.isValidClass(props[propName])) {
        return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, expected React Component class.');
      }
    },
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
      return (
        <Result
          key={ result.id }
          onSelect={ props.onSelect }
          result={ result }
          selectAction={ selectAction } />
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
