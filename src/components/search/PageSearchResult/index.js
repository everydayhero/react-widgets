import React from 'react'
import SearchResult from '../SearchResult'
import Icon from '../../helpers/Icon'
import pages from '../../../api/pages'

export default React.createClass({
  displayName: 'PageSearchResult',

  propTypes: {
    onSelect: React.PropTypes.func,
    result: React.PropTypes.object.isRequired,
    selectAction: React.PropTypes.string.isRequired,
    showSupporterName: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      showSupporterName: true
    }
  },

  render: function () {
    var props = this.props
    var page = props.result
    var campaignName = !pages.isGivePage(page) && page.campaign.name

    return (
      <SearchResult onSelect={props.onSelect} result={page}>
        <div className='PageSearchResult__avatar'>
          <img src={page.image.medium_image_url} />
        </div>
        <div className='PageSearchResult__content'>
          <div className='PageSearchResult__header'>
            { page.name } {props.showSupporterName && <span className='PageSearchResult__subheader'> – { page.supporter.name }</span>}
          </div>
          <p className='PageSearchResult__description'>{ page.charity.name }</p>
          <div className='PageSearchResult__footer'>{ campaignName }</div>
        </div>
        <div className='PageSearchResult__actions'>
          { props.selectAction }
          <Icon icon='arrow-right' fixedWidth />
        </div>
      </SearchResult>
    )
  }
})
