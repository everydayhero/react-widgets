import _ from 'lodash';
import routes from './routes';
import getJSONP from '../lib/getJSONP';

export default {
  aggregate(params, callback) {
    params = _.merge({ page: 1, pageSize: 10 }, params);
    params.searchTerm = encodeURIComponent(params.searchTerm);
    return getJSONP(routes.get('searchAggregate', params), callback, { timeout: 10000 });
  }
};
