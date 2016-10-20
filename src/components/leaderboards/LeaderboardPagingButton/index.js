import React from 'react'
import Icon from '../../helpers/Icon'
import cx from 'classnames'

export default React.createClass({
  displayName: 'LeaderboardPagingButton',

  handleClick: function () {
    this.props.action()
  },

  render: function () {
    var pageCount = this.props.pageCount
    var currentPage = this.props.currentPage
    var classes
    var iconName

    if (this.props.type === 'next') {
      classes = cx({
        'LeaderboardPagingButton__next': true,
        'LeaderboardPagingButton__next--active': currentPage < pageCount
      })

      iconName = 'caret-right'
    } else {
      classes = cx({
        'LeaderboardPagingButton__prev': true,
        'LeaderboardPagingButton__prev--active': currentPage > 1
      })

      iconName = 'caret-left'
    }

    return (
      <div onClick={this.handleClick} className={classes}>
        <Icon className='LeaderboardPagingButton__icon' icon={iconName} />
      </div>
    )
  }
})
