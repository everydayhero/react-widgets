"use strict";

var _      = require('lodash');
var format = require('../../lib/format');

module.exports = {
  t: function(key, params) {
    var i18n = this.props.defaultI18n;
    if (this.props.i18n) {
      i18n = _.merge({}, i18n, this.props.i18n);
    }
    return format(i18n[key], params);
  }
};
