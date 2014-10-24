/** @jsx */
"use strict";

require('es5-shim');
require('es5-shim/es5-sham.js');

var _ = require('lodash');
var React = require('react');
var addEventListener = require('./lib/addEventListener.js');
var widgets = {
  FundsRaised: require('./components/totals/FundsRaised'),
  TotalHeroes: require('./components/totals/TotalHeroes'),
  TotalCharities: require('./components/totals/TotalCharities'),
  Goal: require('./components/totals/Goal'),
  Leaderboard: require('./components/leaderboards/TeamLeaderboard'),
  RecentFundraisers: require('./components/fundraisers/RecentFundraisers'),
  Teams: require('./components/teams/Teams'),
  Map: require('./components/maps/Map'),
  TotalDistance: require('./components/totals/TotalDistance'),
  TotalHours: require('./components/totals/TotalHours'),
  CallToActionBox: require('./components/callstoaction/CallToActionBox'),
};
var modals = {
  CharitySearch: require('./components/search/CharitySearchModal'),
  PageSearch: require('./components/search/PageSearchModal'),
};
var edh = {};

function getElement(element) {
  if (!element) {
    console.error('"element" is required.');
  } else if (_.isString(element)) {
    var elementId = element;
    element = document.getElementById(elementId);
    if (!element) {
      console.error('Could not find element with id "' + elementId + '".');
    }
  }

  return element;
};

function showModal(name, options) {
  var modal = modals[name];
  if (!modal) {
    console.error('Invalid modal name "' + name + '".');
    return;
  }

  var div = document.createElement('div');
  document.body.appendChild(div);

  options.onClose = function() {
    React.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  React.renderComponent(modal(options), div);
};

function initModal(element, name, options) {
  element = getElement(element);
  if (!element) {
    return;
  }
  element.href = '#';

  addEventListener(element, 'click', function(event) {
    if (event) {
      event.preventDefault();
    }
    showModal(name, options);
  });
};

function renderWidget(element, name, options) {
  element = getElement(element);
  if (!element) {
    return;
  }

  var widget = widgets[name];
  if (!widget) {
    console.error('Invalid widget name "' + name + '".');
    return;
  }

  React.renderComponent(widget(options), element);
}

module.exports = edh.widgets = {
  renderWidget: renderWidget,
  showModal: showModal,
  initModal: initModal,
};

global.edh = edh;
