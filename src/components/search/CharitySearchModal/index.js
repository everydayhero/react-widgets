import _ from 'lodash'
import React from 'react'
import SearchModal from '../SearchModal'
import CharitySearchResult from '../CharitySearchResult'
import I18nMixin from '../../mixins/I18n'
import charitiesAPI from '../../../api/charities'
import campaignsAPI from '../../../api/campaigns'

export default React.createClass({
  displayName: 'CharitySearchModal',

  mixins: [I18nMixin],

  propTypes: {
    action: React.PropTypes.oneOf(['visit', 'donate', 'fundraise', 'custom']),
    autoFocus: React.PropTypes.bool,
    campaignUid: React.PropTypes.string,
    campaignSlug: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    i18n: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
    resizeCallback: React.PropTypes.func,
    promotedCharityUids: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps: function () {
    return {
      action: 'visit',
      autoFocus: true,
      campaignUid: '',
      campaignSlug: null,
      resizeCallback: function () {},
      defaultI18n: {
        title: 'Search for a Charity',
        visitAction: 'Visit Charity',
        donateAction: 'Give to this Charity',
        fundraiseAction: 'Fundraise for this Charity',
        emptyLabel: "We couldn't find any matching Charities."
      },
      pageSize: 10,
      promotedCharityUids: null
    }
  },

  getInitialState: function () {
    return {
      cancelRequest: null,
      results: null,
      isSearching: false,
      pagination: {
        count: 0,
        page: 1,
        pageSize: 1,
        totalPages: 0
      }
    }
  },

  getCampaignUid: function () {
    var campaign = this.props.campaignUid
    if (!campaign && this.props.action === 'fundraise') {
      campaign = campaignsAPI.giveCampaignUid(this.props.country)
    }
    return campaign
  },

  componentDidMount: function () {
    if (this.props.promotedCharityUids) {
      this.loadPromotedCharities()
    } else {
      this.search('', 1)
    }
    this.props.resizeCallback()
  },

  loadPromotedCharities: function () {
    charitiesAPI.findByUids(this.props.promotedCharityUids, this.updatePromotedCharities)
  },

  updatePromotedCharities: function (response) {
    var promotedCharities = _.isEmpty(response.charities) ? null : response.charities
    this.setState({ promotedCharities: promotedCharities })
  },

  pageChanged: function (page) {
    this.search(this.state.searchTerm, page)
  },

  inputChanged: function (searchTerm) {
    this.search(searchTerm, 1)
  },

  search: function (searchTerm, page) {
    if (this.state.cancelRequest) {
      this.state.cancelRequest()
    }

    if (!searchTerm && this.props.promotedCharityUids) {
      this.updateResults(null)
      return
    }

    var cancelRequest = charitiesAPI.search({
      country: this.props.country,
      searchTerm: searchTerm,
      campaignUid: this.getCampaignUid(),
      page: page || 1,
      pageSize: this.props.pageSize
    }, this.updateResults)

    this.setState({
      searchTerm: searchTerm,
      isSearching: true,
      cancelRequest: cancelRequest
    })
  },

  updateResults: function (results) {
    if (results) {
      this.setState({
        cancelRequest: null,
        results: results.charities,
        isSearching: false,
        pagination: {
          count: results.meta.pagination.count,
          page: results.meta.pagination.current_page,
          pageSize: this.props.pageSize,
          totalPages: results.meta.pagination.total_pages
        }
      })
    } else {
      this.setState(this.getInitialState())
    }
    this.props.resizeCallback()
  },

  onClose: function () {
    this.props.onClose()
    this.props.resizeCallback()
  },

  selectHandler: function (event, result) {
    this.onClose()

    if (this.props.action === 'custom' && this.props.onSelect) {
      event.preventDefault()
      this.props.onSelect(result.charity)
    }
  },

  selectAction: function () {
    return this.t(this.props.action + 'Action')
  },

  getResults: function () {
    var props = this.props
    var results = this.state.results || this.state.promotedCharities
    var resultUrl = charitiesAPI[props.action + 'Url']

    return results && results.map(function (charity) {
      return {
        id: charity.id,
        charity: charity,
        url: resultUrl ? resultUrl(charity, props.campaignSlug) : charity.url
      }
    })
  },

  render: function () {
    return (
      <SearchModal
        autoFocus={this.props.autoFocus}
        i18n={this.getI18n()}
        isSearching={this.state.isSearching}
        onClose={this.onClose}
        onInputChange={this.inputChanged}
        onPageChange={this.pageChanged}
        onSelect={this.selectHandler}
        pagination={this.state.pagination}
        results={this.getResults()}
        resultComponent={CharitySearchResult}
        selectAction={this.selectAction()} />
    )
  }
})
