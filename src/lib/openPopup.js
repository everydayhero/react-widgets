import _ from 'lodash';

function toString(obj) {
  return _.map(obj, function(value, key) {
    return key + '=' + value;
  }).join(',');
}

function openPopup(url, config) {
  config = _.defaults(config || {}, { width: 640, height: 320 });

  let windowTop  = window.screenTop ? window.screenTop : window.screenY;
  let windowLeft = window.screenLeft ? window.screenLeft : window.screenX;

  config.top  = windowTop + (window.innerHeight / 2) - (config.height / 2);
  config.left = windowLeft + (window.innerWidth / 2) - (config.width / 2);
  config      = toString(config);

  window.open(url, 'shareWindow', config);
}

export default openPopup;
