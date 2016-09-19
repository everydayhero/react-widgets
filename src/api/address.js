import routes from './routes';
import getJSONP from '../lib/getJSONP';

export default {
  find(id, country, callback) {
    return getJSONP(routes.get('address', { id: id, country: country }), callback);
  },

  search: function(searchTerm, country, callback) {
    var query = { searchTerm: encodeURIComponent(searchTerm), country: country };
    return getJSONP(routes.get('searchAddresses', query), callback);
  }
};
