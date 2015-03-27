"use strict";

var _ = require('lodash');
var React = require('react');
var i18n = require('../../lib/i18n');
var Remarkable = require('remarkable');
var md = new Remarkable({ xhtmlOut: true, breaks: true });

module.exports = {
  getI18n: function() {
    var i18n = this.props.defaultI18n || {};
    if (this.props.i18n) {
      i18n = _.merge({}, i18n, this.props.i18n);
    }
    return i18n;
  },

  t: function(key, params) {
    return i18n.t(this.getI18n(), key, params);
  },

  tm: function(key, params) {
    var html = md.render(this.t(key, params));
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }
};
