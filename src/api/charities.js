import _ from 'lodash';
import routes from './routes';
import campaigns from './campaigns';
import getJSONP from '../lib/getJSONP';

export default {
  find(charityUid, callback) {
    return getJSONP(routes.get('charity', { charityUid: charityUid }), callback);
  },

  findBySlug(country, charitySlug, callback) {
    return this.find(country + '/' + charitySlug, callback);
  },

  findByUids(charityUids, callback) {
    if (_.isEmpty(charityUids)) {
      _.defer(callback, { charities: [] });
      return;
    }

    return getJSONP(routes.get('charities', { charityUids: charityUids }), function(response) {
      _.each(response.charities, function(charity) {
        charity.uid = charity.id;
      });
      callback(response);
    });
  },

  findByCampaign(campaignUid, limit, page, callback) {
    let params = {
      campaignUid: campaignUid,
      page: page,
      limit: limit
    };
    return getJSONP(routes.get('charities', params), callback);
  },

  leaderboard(charityUid, type, limit, callback, options) {
    let params = _.merge({
      charityUid: charityUid,
      type: type,
      limit: limit
    }, options);
    return getJSONP(routes.get('charityLeaderboard', params), callback);
  },

  leaderboardBySlug(country, charitySlug, type, limit, callback, options) {
    return this.leaderboard(country + '/' + charitySlug, type, limit, callback, options);
  },

  search(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchCharities', params), callback, { timeout: 10000 });
  },

  donateUrl(charity, campaignSlug) {
    return routes.get('donate', {
      country: charity.country_code,
      campaignSlug: campaignSlug || campaigns.giveCampaignSlug(),
      charitySlug: charity.slug
    });
  },

  fundraiseUrl(charity, campaignSlug) {
    return routes.get('fundraise', {
      country: charity.country_code,
      campaignSlug: campaignSlug || campaigns.giveCampaignSlug(),
      charitySlug: charity.slug
    });
  }
};
