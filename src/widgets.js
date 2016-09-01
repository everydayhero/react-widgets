'use strict';

require('es5-shim');
require('es5-shim/es5-sham');
require('./lib/consoleShim');

var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./api/routes');
var addEventListener = require('./lib/addEventListener');
var renderModal = require('./lib/renderModal');
var widgets = {
  AddressLookup:      require('./components/address/AddressLookup'),
  Amount:             require('./components/amount/Amount'),
  CallToActionBox:    require('./components/callstoaction/CallToActionBox'),
  CallToActionButton: require('./components/callstoaction/CallToActionButton'),
  CampaignGoals:      require('./components/events/Goals'),
  CountDown:          require('./components/events/CountDown'),
  EntityGoalProgress: require('./components/totals/EntityGoalProgress'),
  Event:              require('./components/events/Event'),
  FitnessLeaderboard: require('./components/leaderboards/FitnessLeaderboard'),
  Footprint:          require('./components/footprint/Footprint'),
  FundsRaised:        require('./components/totals/FundsRaised'),
  Goal:               require('./components/totals/Goal'),
  Input:              require('./components/forms/Input'),
  Leaderboard:        require('./components/leaderboards/Leaderboard'),
  LeaderboardPaging:  require('./components/leaderboards/LeaderboardPaging'),
  Map:                require('./components/maps/Map'),
  PromoCharities:     require('./components/charities/PromoCharities'),
  RecentFundraisers:  require('./components/fundraisers/RecentFundraisers'),
  SearchInput:        require('./components/forms/SearchInput'),
  ShareButton:        require('./components/sharing/ShareButton'),
  Supporters:         require('./components/supporters/Supporters'),
  Tabs:               require('./components/tabs/Tabs'),
  TeamLeaderboard:    require('./components/leaderboards/TeamLeaderboard'),
  Teams:              require('./components/teams/Teams'),
  TotalCalories:      require('./components/totals/TotalCalories'),
  TotalCharities:     require('./components/totals/TotalCharities'),
  TotalCustomMetric:  require('./components/totals/TotalCustomMetric'),
  TotalDistance:      require('./components/totals/TotalDistance'),
  TotalDonations:     require('./components/totals/TotalDonations'),
  TotalHours:         require('./components/totals/TotalHours'),
  TotalSupporters:    require('./components/totals/TotalSupporters'),
  UpcomingEvents:     require('./components/events/UpcomingEvents')
};
var modals = {
  AggregateSearch:          require('./components/search/AggregateSearchModal'),
  CharitySearch:            require('./components/search/CharitySearchModal'),
  CharitySearchModalCustom: require('./components/search/CharitySearchModalCustom'),
  PageSearch:               require('./components/search/PageSearchModal'),
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
