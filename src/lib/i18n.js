import _ from 'lodash';
import format from './format';

const separator = '.';

function lookup(object, key) {
  let value = object;
  let keys = key.split(separator);

  for (let i = 0; value && i < keys.length; ++i) {
    value = value[keys[i]];
  }
  return value;
}

function translate(i18n, key, params) {
  let scope = params && params.scope;
  let value = scope && lookup(i18n, scope + separator + key) || lookup(i18n, key);

  if (params && params.count !== undefined && _.isObject(value)) {
    let pluralisation = params.count == 1 ? 'one' : 'other';
    value = value[pluralisation];
  }

  return value && format(value, params);
}

export default {
  t: translate
};
