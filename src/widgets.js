"use strict";

require('es5-shim');
require('es5-shim/es5-sham');

var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./api/routes');
var addEventListener = require('./lib/addEventListener');
var consoleShim = require('./lib/consoleShim');
var renderModal = require('./lib/renderModal');
var widgets = {
  FundsRaised: require('./components/totals/FundsRaised'),
  TotalSupporters: require('./components/totals/TotalSupporters'),
  TotalCharities: require('./components/totals/TotalCharities'),
  Goal: require('./components/totals/Goal'),
  EntityGoalProgress: require('./components/totals/EntityGoalProgress'),
  Leaderboard: require('./components/leaderboards/Leaderboard'),
  TeamLeaderboard: require('./components/leaderboards/TeamLeaderboard'),
  LeaderboardPaging: require('./components/leaderboards/LeaderboardPaging'),
  FitnessLeaderboard: require('./components/leaderboards/FitnessLeaderboard'),
  UpcomingEvents: require('./components/events/UpcomingEvents'),
  Event: require('./components/events/Event'),
  CountDown: require('./components/events/CountDown'),
  RecentFundraisers: require('./components/fundraisers/RecentFundraisers'),
  Teams: require('./components/teams/Teams'),
  Map: require('./components/maps/Map'),
  TotalDistance: require('./components/totals/TotalDistance'),
  TotalHours: require('./components/totals/TotalHours'),
  TotalCalories: require('./components/totals/TotalCalories'),
  TotalDonations: require('./components/totals/TotalDonations'),
  CallToActionBox: require('./components/callstoaction/CallToActionBox'),
  CallToActionButton: require('./components/callstoaction/CallToActionButton'),
  PromoCharities: require('./components/charities/PromoCharities'),
  AddressLookup: require('./components/address/AddressLookup'),
  Amount: require('./components/amount/Amount'),
  Input: require('./components/forms/Input'),
  SearchInput: require('./components/forms/SearchInput'),
  Footprint: require('./components/footprint/Footprint'),
  Supporters: require('./components/supporters/Supporters'),
  ShareButton: require('./components/sharing/ShareButton'),
  Tabs: require('./components/tabs/Tabs')
};
var modals = {
  AggregateSearch: require('./components/search/AggregateSearchModal'),
  CharitySearch: require('./components/search/CharitySearchModal'),
  CharitySearchModalCustom: require('./components/search/CharitySearchModalCustom'),
  PageSearch: require('./components/search/PageSearchModal'),
};

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
}

function showModal(name, options) {
  var modal = modals[name];
  if (!modal) {
    console.error('Invalid modal name "' + name + '".');
    return;
  }

  renderModal(modal, options);
}

function initModal(element, name, options) {
  element = getElement(element);
  if (!element) {
    return;
  }
  element.href = '#';

  addEventListener('click', function(event) {
    if (event) {
      event.preventDefault();
    }
    showModal(name, options);
  }, element);
}

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

  ReactDOM.render(React.createElement(widget, options), element);
}

module.exports = {
  setBaseUrl: routes.setBaseUrl,
  renderWidget: renderWidget,
  initModal: initModal,
  showModal: showModal,
  widgets: widgets,
};
