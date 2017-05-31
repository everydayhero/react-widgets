import _ from 'lodash'
import routes from './routes'
import getJSONP from '../lib/getJSONP'
import paramJoin from '../lib/paramJoin'

export default {
  findByCampaigns (params, callback, options) {
    let campaignUids = params.campaignUids ? paramJoin(params.campaignUids, ',') : undefined
    let groupValues = params.groupValues ? paramJoin(params.groupValues, ',') : undefined
    let mergedParams = _.merge({ campaignUid: campaignUids, groupValue: groupValues }, options)

    return getJSONP(routes.get('totals', mergedParams), callback)
  },

  findByTeams (teamIds, callback, options) {
    teamIds = paramJoin(teamIds, ',')
    let params = _.merge({ teamId: teamIds }, options)

    return getJSONP(routes.get('totals', params), callback)
  },

  findByPages (pageIds, callback, options) {
    pageIds = paramJoin(pageIds, ',')
    let params = _.merge({ page: pageIds }, options)

    return getJSONP(routes.get('totals', params), callback)
  },

  findByCharities (params, callback, options) {
    let charityUids = params.charityUids ? paramJoin(params.charityUids, ',') : undefined
    let groupValues = params.groupValues ? paramJoin(params.groupValues, ',') : undefined
    let mergedParams = _.merge({ charityUid: charityUids, groupValue: groupValues }, options)

    return getJSONP(routes.get('totals', mergedParams), callback)
  },

  findByAll (params, callback, options) {
    let charityUids = params.charityUids ? paramJoin(params.charityUids, ',') : undefined
    let campaignUids = params.campaignUids ? paramJoin(params.campaignUids, ',') : undefined
    let groupValues = params.groupValues ? paramJoin(params.groupValues, ',') : undefined
    let mergedParams = _.merge({ charityUid: charityUids, campaignUid: campaignUids, groupValue: groupValues }, options)

    return getJSONP(routes.get('totals', mergedParams), callback)
  }
}
