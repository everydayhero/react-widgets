"use strict";

var _      = require('lodash');
var format = require('../../lib/format');

module.exports = {
  getI18n: function() {
    var i18n = this.props.defaultI18n || {};
    if (this.props.i18n) {
      i18n = _.merge({}, i18n, this.props.i18n);
    }
    return i18n;
  },

  t: function(key, params) {
    return format(this.getI18n()[key], params);
  }
};
