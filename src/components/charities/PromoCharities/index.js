import _ from 'lodash'
import React from 'react'
import I18nMixin from '../../mixins/I18n'
import charities from '../../../api/charities'
import Tabs from '../../tabs/Tabs'
import PromoCharitiesResults from '../PromoCharitiesResults'

export default React.createClass({
  displayName: 'PromoCharities',
  mixins: [I18nMixin],
  propTypes: {
    action: React.PropTypes.oneOf(['donate', 'fundraise', 'custom']).isRequired,
    tabs: React.PropTypes.array.isRequired,
    showCharityTitle: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      tabs: [],
      showCharityTitle: false,
      defaultI18n: {
        heading: 'Promoted Charities',
        subheading: 'Choose a tab below to view promoted charities within each category.',
        donateAction: 'Give Now',
        fundraiseAction: 'Fundraise',
        customAction: 'Select'
      }
    }
  },

  getInitialState: function () {
    return {
      isLoaded: false,
      isLoading: false,
      results: []
    }
  },

  componentWillMount: function () {
    var tabs = _.map(this.props.tabs, function (tab, tabIndex) {
      var data = {
        tabName: tab.category,
        contents: []
      }

      charities.findByUids(tab.charityUids, function (responses) {
        this.tabLoaded(tabIndex, responses.charities)
      }.bind(this))

      return data
    }.bind(this))

    this.setState({
      isLoading: true,
      tabs: tabs
    })
  },

  tabLoaded: function (tabIndex, charities) {
    var keys = this.props.tabs[tabIndex].charityUids
    var tabs = this.state.tabs
    var tab = tabs[tabIndex]

    tab.isLoaded = true
    tab.contents = this.orderCharities(charities, keys)

    this.setState({
      isLoaded: _.every(tabs, 'isLoaded'),
      tabs: tabs
    })
  },

  orderCharities: function (charities, keys) {
    return _.sortBy(charities, function (charity) {
      return keys.indexOf(charity.id)
    })
  },

  fetchUrl: function (charity) {
    if (this.props.action == 'custom') {
      return
    } else {
      return charities[this.props.action + 'Url'](charity, null) || charity.url
    }
  },

  selectHandler: function (charity) {
    if (this.props.action == 'custom') {
      this.props.onSelect(charity)
    } else {
      document.location = this.fetchUrl(charity)
    }
  },

  renderCharityResults: function () {
    return this.state.tabs.map(function (d) {
      return (
        <PromoCharitiesResults
          tabLabel={d.tabName}
          content={d.contents}
          loaded={this.state.isLoaded}
          onSelect={this.selectHandler}
          fetchUrl={this.fetchUrl}
          actionLabel={this.t(this.props.action + 'Action')}
          showCharityTitle={this.props.showCharityTitle}
          key={'charity-result-' + d.tabName} />
      )
    }, this)
  },

  render: function () {
    var heading = this.t('heading')
    var subheading = this.t('subheading')

    var renderSubheading = function () {
      if (subheading) {
        return <p className='PromoCharities__subheading'>{ subheading }</p>
      }
    }

    return (
      <div className='PromoCharities'>
        <div className='PromoCharities__head'>
          <h3 className='PromoCharities__heading'>{ heading }</h3>
          { renderSubheading() }
        </div>
        <Tabs>
          { this.renderCharityResults() }
        </Tabs>
      </div>
    )
  }
})
