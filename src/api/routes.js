"use strict";

var _ = require('lodash');
var format = require('../lib/format');

var routes = {
  donate: {
    au: 'https://heroix.everydayhero.com.au/charities/{charityId}/donate',
    nz: 'https://heroix.everydayhero.co.nz/charities/{charityId}/donate',
    uk: 'https://heroix.everydayhero.co.uk/charities/{charityId}/donate',
  },
  fundraise:            'https://{campaignSlug}.everydayhero.com/{country}/{charitySlug}/get-started',

  campaign:             'https://everydayhero.com/api/v2/campaigns/{campaignUid}.jsonp',
  campaignLeaderboard:  'https://everydayhero.com/api/v2/campaigns/{campaignUid}/leaderboard.jsonp?type={type}&limit={limit}',
  charity:              'https://everydayhero.com/api/v2/charities/{charityUid}.jsonp',
  charities:            'https://everydayhero.com/api/v2/charities.jsonp?campaign_ids={campaignUid}&page={page}&limit={limit}',
  page:                 'https://everydayhero.com/api/v2/pages/{pageId}.jsonp',
  pages:                'https://everydayhero.com/api/v2/pages.jsonp?ids={pageIds}&campaign_id={campaignUid}&type={type}&page={page}&limit={limit}',

  searchCampaigns:      'https://everydayhero.com/api/v2/search/campaigns.jsonp?q={searchTerm}&country_code={country}&page={page}&page_size={pageSize}',
  searchCharities:      'https://everydayhero.com/api/v2/search/charities.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&page={page}&page_size={pageSize}',
  searchPages:          'https://everydayhero.com/api/v2/search/pages.jsonp?q={searchTerm}&country_code={country}&campaign_id={campaignUid}&charity_id={charityUid}&type={type}&page={page}&page_size={pageSize}',
};

module.exports = function(path, params) {
  var route = routes[path];
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
};
