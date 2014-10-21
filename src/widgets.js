"use strict";

require('es5-shim');
require('es5-shim/es5-sham.js');

var React = require('react');
var CharitySearch = require('./components/search/CharitySearch');
var addEventListener = require('./lib/addEventListener.js');
var widgets = {
  FundsRaised: require('./components/totals/FundsRaised'),
  TotalHeroes: require('./components/totals/TotalHeroes'),
  TotalCharities: require('./components/totals/TotalCharities'),
  Goal: require('./components/totals/Goal'),
  Leaderboard: require('./components/leaderboards/TeamLeaderboard')
}
var edh = {widgets: {}};

var CharitySearchInit = function(options) {
  var element = options.element || document.getElementById(options.elementId);
  element.href = '#';

  addEventListener(element, 'click', function(event) {
    if (event) {
      event.preventDefault();
    };

    var div = document.createElement('div');
    document.body.appendChild(div);

    options.onClose = function() {
      React.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }

    React.renderComponent(CharitySearch(options), div);
  });
};

var renderWidget = function(id, name, args) {
  React.renderComponent(widgets[name](args), document.getElementById(id));
}

module.exports = edh.widgets = {
  CharitySearchInit: CharitySearchInit,
  renderWidget: renderWidget
};

global.edh = edh;
