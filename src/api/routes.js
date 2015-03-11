"use strict";

var _ = require('lodash');
var format = require('../lib/format');
var parseUrl = require('../lib/parseUrl');

var defaultBaseUrl = 'https://everydayhero.com';
var baseRoutes = {
  donate:               '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/donate',
  fundraise:            '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/get-started',

  campaign:             '{baseUrl}/api/v2/campaigns/{campaignUid}.jsonp',
  campaignLeaderboard:  '{baseUrl}/api/v2/campaigns/{campaignUid}/leaderboard.jsonp?type={type}&limit={limit}&include_pages={includePages}&include_footprint={includeFootprint}',
  campaigns:            '{baseUrl}/api/v2/campaigns.jsonp?ids={campaignUids}&charity_id={charityUid}&sort_by={sortBy}&status={status}&exclude_bau={excludeBau}&page={page}&limit={limit}',
  charity:              '{baseUrl}/api/v2/charities/{charityUid}.jsonp',
  charityLeaderboard:   '{baseUrl}/api/v2/charities/{charityUid}/leaderboard.jsonp?type={type}&limit={limit}&include_pages={includePages}&include_footprint={includeFootprint}',
  charities:            '{baseUrl}/api/v2/charities.jsonp?ids={charityUids}&campaign_ids={campaignUid}&page={page}&limit={limit}',
  page:                 '{baseUrl}/api/v2/pages/{pageId}.jsonp?include_footprint={includeFootprint}',
  pages:                '{baseUrl}/api/v2/pages.jsonp?ids={pageIds}&campaign_id={campaignUid}&type={type}&include_footprint={includeFootprint}&page={page}&limit={limit}',

  searchCampaigns:      '{baseUrl}/api/v2/search/campaigns.jsonp?q={searchTerm}&country_code={country}&page={page}&page_size={pageSize}',
  searchCharities:      '{baseUrl}/api/v2/search/charities.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&page={page}&page_size={pageSize}',
  searchPages:          '{baseUrl}/api/v2/search/pages.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&charity_id={charityUid}&type={type}&page={page}&page_size={pageSize}',

  address:              '{baseUrl}/api/v2/addresses/{country}/{id}.jsonp',
  searchAddresses:      '{baseUrl}/api/v2/addresses.jsonp?country_code={country}&q={searchTerm}'
};
var routes = {};

function getRoute(name, params) {
  var route = routes[name];
  if (!route) {
    return;
  }

  params = _.mapValues(params, function(value) {
    if (_.isArray(value)) {
      return value.join(',');
    }
    return value == null ? '' : value;
  });

  route = format(route, params, true);
  route = route.replace(/\w+=(&|$)/g, '').replace(/(\?|&)$/, '');  // removed empty query params

  return route;
}

function setBaseUrl(baseUrl) {
  var splitUrl = parseUrl(baseUrl);
  if (!splitUrl) {
    console.error('Invalid base URL "' + baseUrl + '", expected URL such as "http://server.com" or "http://localhost:3000".');
    return false;
  }

  var params = {
    protocol: splitUrl.protocol,
    hostname: splitUrl.hostname,
    baseUrl: baseUrl
  };

  routes = _.mapValues(baseRoutes, function(url) {
    return format(url, params);
  });
}

setBaseUrl(defaultBaseUrl);

module.exports = {
  get: getRoute,
  setBaseUrl: setBaseUrl
};
