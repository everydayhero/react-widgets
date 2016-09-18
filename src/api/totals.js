import _ from 'lodash';
import routes from './routes';
import getJSONP from '../lib/getJSONP';
import paramJoin from '../lib/paramJoin';

export default {
  findByCampaigns(params, callback, options) {
    let campaignUids = params.campaignUids ? paramJoin(params.campaignUids, '&campaign_id[]=') : undefined;
    let groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    let mergedParams = _.merge({ campaignUid: campaignUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  },

  findByPages: function(pageIds, callback, options) {
    pageIds = paramJoin(pageIds, '&page_id[]=');
    var params = _.merge({ page: pageIds }, options);

    return getJSONP(routes.get('totals', params), callback);
  },

  findByCharities: function(params, callback, options) {
    var charityUids = params.charityUids ? paramJoin(params.charityUids, '&charity_id[]=') : undefined;
    var groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ charityUid: charityUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  },

  findByAll: function(params, callback, options) {
    var charityUids = params.charityUids ? paramJoin(params.charityUids, '&charity_id[]=') : undefined;
    var campaignUids = params.campaignUids ? paramJoin(params.campaignUids, '&campaign_id[]=') : undefined;
    var groupValues = params.groupValues ? paramJoin(params.groupValues, '&group_value[]=') : undefined;
    var mergedParams = _.merge({ charityUid: charityUids, campaignUid: campaignUids, groupValue: groupValues }, options);

    return getJSONP(routes.get('totals', mergedParams), callback);
  }
};
