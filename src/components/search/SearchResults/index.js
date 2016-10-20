import _ from 'lodash'
import React from 'react'
import SearchResult from '../SearchResult'
import I18nMixin from '../../mixins/I18n'

export default React.createClass({
  displayName: 'SearchResults',

  mixins: [I18nMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    results: React.PropTypes.arrayOf(React.PropTypes.object),
    resultComponent: React.PropTypes.func.isRequired,
    selectAction: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      results: null,
      resultComponent: SearchResult,
      defaultI18n: {
        selectAction: 'Select',
        emptyLabel: 'No results'
      }
    }
  },

  getResults: function () {
    if (this.props.results && _.isEmpty(this.props.results)) {
      return <p className='SearchResults--empty'>{ this.t('emptyLabel') }</p>
    }

    var props = this.props
    var Result = props.resultComponent
    var selectAction = props.selectAction || this.t('selectAction')

    return _.map(this.props.results || [], function (result) {
      return (
        <Result
          key={result.id}
          onSelect={props.onSelect}
          result={result}
          selectAction={selectAction} />
      )
    })
  },

  render: function () {
    return (
      <div className='SearchResults'>
        { this.getResults() }
      </div>
    )
  }
})
