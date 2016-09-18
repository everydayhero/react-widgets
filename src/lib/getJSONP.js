import _ from 'lodash';
import jsonp from 'jsonp';

const DEFAULT_TIMEOUT = 20000;
const IS_CLIENT = typeof window !== 'undefined';
const DEFAULT_RETRIES = 2;
let noop = function() {};
let cache = {};

function getJSONP(url, callback, options) {
  if (cache[url]) {
    _.defer(callback, cache[url]);
    return noop;
  }

  options = options || {};
  var timeout = options.timeout || DEFAULT_TIMEOUT;
  var retries = options.retries || DEFAULT_RETRIES;
  var cancelRequest;

  var requestHandler = function(error, data) {
    if (error) {
      if (retries-- > 0) {
        cancelRequest = jsonp(url, {timeout: timeout}, requestHandler);
      } else {
        callback(null);
      }
    } else {
      cache[url] = data;
      _.defer(callback, data);
    }
  };

  cancelRequest = jsonp(url, {timeout: timeout}, requestHandler);

  var cancelCallback = function() {
    cancelRequest();
  };

  return cancelCallback;
}

export default IS_CLIENT ? getJSONP : function() { return noop; };
