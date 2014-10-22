"use strict";

var _ = require('lodash');
var format = require('../lib/format');

var routes = {
  donate: {
    au: 'https://heroix.everydayhero.com.au/charities/{id}/donate',
    nz: 'https://heroix.everydayhero.co.nz/charities/{id}/donate',
    uk: 'https://heroix.everydayhero.co.uk/charities/{id}/donate',
  },
  fundraise: 'https://give.everydayhero.com/{country}/{slug}/get-started',
  charities: 'https://everydayhero.com/api/v2/search/charities.jsonp',

  leaderboard: 'https://everydayhero.com/api/v2/campaigns/{id}/leaderboard.jsonp?type={type}&limit={limit}',
  leaderboardPages: 'https://everydayhero.com/api/v2/pages.jsonp?ids={ids}',

  campaignCharities: 'https://everydayhero.com/api/v2/search/charities.jsonp?campaign_id={id}&page=1&page_size=1',
  pages: 'https://everydayhero.com/api/v2/search/pages.jsonp?campaign_id={id}&page={page_count}&page_size={page_size}&type={type}',
  staticPages: 'https://everydayhero.com/api/v2/pages.jsonp?campaign_id={id}&type={team}&limit={limit}&page={page}',
  campaigns: 'https://everydayhero.com/api/v2/campaigns/{id}.jsonp'
};

module.exports = function(path, params) {
  var route = routes[path];
  if (_.isObject(route)) {
    route = route[params.country];
  }
  return format(route, params);
};
