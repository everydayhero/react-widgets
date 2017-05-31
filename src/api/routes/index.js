import _ from 'lodash'
import format from '../../lib/format'
import parseUrl from '../../lib/parseUrl'
import axios from 'axios'

const defaultBaseUrl = 'https://everydayhero.com'

const client = axios.create({baseURL: defaultBaseUrl})

const baseRoutes = {
  donate: '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/donate',
  fundraise: '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/get-started',

  campaign: '{baseUrl}/api/v2/campaigns/{campaignUid}.jsonp?exclude_charities={excludeCharities}&exclude_pages={excludePages}',
  campaignLeaderboardDynamic: '{baseUrl}/api/v2/search/pages_totals.jsonp?campaign_id={campaignUid}&group_value[]={groupValue}&type={type}&limit={limit}',
  campaignLeaderboard: '{baseUrl}/api/v2/campaigns/{campaignUid}/leaderboard.jsonp?type={type}&limit={limit}&include_pages={includePages}&include_footprint={includeFootprint}&charity_ids={charityUid}&group_value[]={groupValue}',
  campaigns: '{baseUrl}/api/v2/campaigns.jsonp?ids={campaignUids}&charity_id={charityUid}&sort_by={sortBy}&status={status}&exclude_bau={excludeBau}&exclude_charities={excludeCharities}&exclude_pages={excludePages}&page={page}&limit={limit}',
  charity: '{baseUrl}/api/v2/charities/{charityUid}.jsonp',
  charityLeaderboard: '{baseUrl}/api/v2/charities/{charityUid}/leaderboard.jsonp?type={type}&limit={limit}&include_pages={includePages}&include_footprint={includeFootprint}',
  charities: '{baseUrl}/api/v2/charities.jsonp?ids={charityUids}&campaign_ids={campaignUid}&page={page}&limit={limit}',
  page: '{baseUrl}/api/v2/pages/{pageId}.jsonp?include_footprint={includeFootprint}&start_created_at={start}&end_created_at={end}',
  pages: '{baseUrl}/api/v2/pages.jsonp?ids={pageIds}&campaign_id={campaignUid}&charity_ids={charityUid}&type={type}&include_footprint={includeFootprint}&page={page}&limit={limit}&start_created_at={start}&end_created_at={end}',

  searchAggregate: '{baseUrl}/api/v2/search/aggregate.jsonp?q={searchTerm}&country_code={country}&page={page}&page_size={pageSize}&minimum_score={minimumScore}',
  searchCampaigns: '{baseUrl}/api/v2/search/campaigns.jsonp?q={searchTerm}&country_code={country}&page={page}&page_size={pageSize}&minimum_score={minimumScore}&charity_ids={charityUids}&charity_uuids={charityUuids}',
  searchCharities: '{baseUrl}/api/v2/search/charities.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&page={page}&page_size={pageSize}&minimum_score={minimumScore}',
  searchPages: '{baseUrl}/api/v2/search/pages.jsonp?q={searchTerm}&country_code={country}&campaign_id[]={campaignUid}&charity_id[]={charityUid}&group_value[]={groupValue}&type={pageType}&page={page}&page_size={pageSize}&minimum_score={minimumScore}',

  address: '{baseUrl}/api/v2/addresses/{country}/{id}.jsonp',
  searchAddresses: '{baseUrl}/api/v2/addresses.jsonp?country_code={country}&q={searchTerm}',
  totals: '{baseUrl}/api/v2/search/totals.jsonp?charity_ids={charityUid}&campaign_ids={campaignUid}&group_values={groupValue}&team_ids={teamId}&page_ids={page}&start_at={start}&end_at={end}&kind={type}&country_code={country}'
}
let routes = {}

function removeEmptyQueryParams (url) {
  return url.replace(/\w+(?:\W+|)=(&|$)/g, '').replace(/(\?|&)$/, '')
}

function getRoute (name, params) {
  let route = routes[name]
  if (!route) {
    return
  }

  params = _.mapValues(params, function (value) {
    if (_.isArray(value)) {
      return value.join(',')
    }
    return value == null ? '' : value
  })

  route = format(route, params, true)
  route = removeEmptyQueryParams(route)

  return route
}

function setBaseUrl (baseUrl) {
  const splitUrl = parseUrl(baseUrl)
  if (!splitUrl) {
    console.error('Invalid base URL "' + baseUrl + '", expected URL such as "http://server.com" or "http://localhost:3000".')
    return false
  }

  const params = {
    protocol: splitUrl.protocol,
    hostname: splitUrl.hostname,
    baseUrl: baseUrl
  }

  routes = _.mapValues(baseRoutes, function (url) {
    return format(url, params)
  })
}

setBaseUrl(defaultBaseUrl)

export default {
  get: getRoute,
  setBaseUrl,
  client
}
