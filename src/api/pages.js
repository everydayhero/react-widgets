import _ from 'lodash';
import routes from './routes';
import getJSONP from '../lib/getJSONP';
import campaigns from './campaigns';
import paramJoin from '../lib/paramJoin';

export default {
  find(pageId, callback, options) {
    let params = _.merge({ pageId: pageId }, options);
    return getJSONP(routes.get('page', params), callback);
  },

  findByIds(pageIds, callback, options) {
    let params = _.merge({ pageIds: pageIds }, options);
    return getJSONP(routes.get('pages', params), callback);
  },

  findByCampaign(campaignUid, type, limit, page, callback, options) {
    let params = _.merge({
      campaignUid: campaignUid,
      type: type,
      page: page,
      limit: limit
    }, options);

    return getJSONP(routes.get('pages', params), callback);
  },

  findByCharity(charityUid, type, limit, page, callback, options) {
    let params = _.merge({
      charityUid: charityUid,
      type: type,
      page: page,
      limit: limit
    }, options);

    return getJSONP(routes.get('pages', params), callback);
  },

  search(params, callback) {
    params.charityUid = params.charityUid ? paramJoin(params.charityUid, '&charity_id[]=') : '';
    params.campaignUid = params.campaignUid ? paramJoin(params.campaignUid, '&campaign_id[]=') : '';
    params.groupValue = params.groupValue ? paramJoin(params.groupValue, '&group_value[]=') : '';
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);

    return getJSONP(routes.get('searchPages', params), callback, {timeout: 10000});
  },

  isGivePage(page) {
    return page.campaign.uid &&
      page.campaign.uid == campaigns.giveCampaignUid(page.country_code);
  }
};
