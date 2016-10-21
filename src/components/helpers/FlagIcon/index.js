import _ from 'lodash'
import React from 'react'

export default React.createClass({
  displayName: 'FlagIcon',

  propTypes: {
    className: React.PropTypes.string,
    country: React.PropTypes.string.isRequired
  },

  render: function () {
    var classes = _.compact(['FlagIcon', this.props.className]).join(' ')

    return (
      <span className={classes}>
        <i className={'flag ' + this.props.country.toLowerCase()} />
      </span>
    )
  }
})
