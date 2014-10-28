"use strict";

var _ = require('lodash');
var format = require('../lib/format');
var parseUrl = require('../lib/parseUrl');

var defaultBaseUrl = 'https://everydayhero.com';
var baseRoutes = {
  donate:               '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/donate',
  fundraise:            '{protocol}://{campaignSlug}.{hostname}/{country}/{charitySlug}/get-started',

  campaign:             '{baseUrl}/api/v2/campaigns/{campaignUid}.jsonp',
  campaignLeaderboard:  '{baseUrl}/api/v2/campaigns/{campaignUid}/leaderboard.jsonp?type={type}&limit={limit}',
  charity:              '{baseUrl}/api/v2/charities/{charityUid}.jsonp',
  charities:            '{baseUrl}/api/v2/charities.jsonp?campaign_ids={campaignUid}&page={page}&limit={limit}',
  page:                 '{baseUrl}/api/v2/pages/{pageId}.jsonp',
  pages:                '{baseUrl}/api/v2/pages.jsonp?ids={pageIds}&campaign_id={campaignUid}&type={type}&page={page}&limit={limit}',

  searchCampaigns:      '{baseUrl}/api/v2/search/campaigns.jsonp?q={searchTerm}&country_code={country}&page={page}&page_size={pageSize}',
  searchCharities:      '{baseUrl}/api/v2/search/charities.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&page={page}&page_size={pageSize}',
  searchPages:          '{baseUrl}/api/v2/search/pages.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&charity_id={charityUid}&type={type}&page={page}&page_size={pageSize}',
};

var routes = {};

function getRoute(name, params) {
  var route = routes[name];
  if (_.isObject(route)) {
    route = route[params.country];
  }

  params = _.mapValues(params, function(value) {
    if (_.isArray(value)) {
      return value.join(',');
    }
    return value == null ? '' : encodeURIComponent(value);
  });

  return route && format(route, params).replace(/\{.+?\}/g, '').replace(/\w+=(&|$)/g, '');
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
