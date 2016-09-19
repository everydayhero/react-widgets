import 'es5-shim';
import 'es5-shim/es5-sham';
import './lib/consoleShim';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './api/routes';
import addEventListener from './lib/addEventListener';
import renderModal from './lib/renderModal';

// Widgets
import AddressLookup from './components/address/AddressLookup';
import Amount from './components/amount/Amount';
import CallToActionBox from './components/callstoaction/CallToActionBox';
import CallToActionButton from './components/callstoaction/CallToActionButton';
import CampaignGoals from './components/events/Goals';
import CountDown from './components/events/CountDown';
import EntityGoalProgress from './components/totals/EntityGoalProgress';
import Event from './components/events/Event';
import FitnessLeaderboard from './components/leaderboards/FitnessLeaderboard';
import Footprint from './components/footprint/Footprint';
import FundsRaised from './components/totals/FundsRaised';
import Goal from './components/totals/Goal';
import Input from './components/forms/Input';
import Leaderboard from './components/leaderboards/Leaderboard';
import LeaderboardPaging from './components/leaderboards/LeaderboardPaging';
import Map from './components/maps/Map';
import PromoCharities from './components/charities/PromoCharities';
import RecentFundraisers from './components/fundraisers/RecentFundraisers';
import SearchInput from './components/forms/SearchInput';
import ShareButton from './components/sharing/ShareButton';
import Supporters from './components/supporters/Supporters';
import Tabs from './components/tabs/Tabs';
import TeamLeaderboard from './components/leaderboards/TeamLeaderboard';
import Teams from './components/teams/Teams';
import TotalCalories from './components/totals/TotalCalories';
import TotalCharities from './components/totals/TotalCharities';
import TotalCustomMetric from './components/totals/TotalCustomMetric';
import TotalDistance from './components/totals/TotalDistance';
import TotalDonations from './components/totals/TotalDonations';
import TotalHours from './components/totals/TotalHours';
import TotalSupporters from './components/totals/TotalSupporters';
import UpcomingEvents from './components/events/UpcomingEvents';

// Modals
import AggregateSearch from './components/search/AggregateSearchModal';
import CharitySearch from './components/search/CharitySearchModal';
import CharitySearchModalCustom from './components/search/CharitySearchModalCustom';
import PageSearch from './components/search/PageSearchModal';

const widgets = {
  AddressLookup,
  Amount,
  CallToActionBox,
  CallToActionButton,
  CampaignGoals,
  CountDown,
  EntityGoalProgress,
  Event,
  FitnessLeaderboard,
  Footprint,
  FundsRaised,
  Goal,
  Input,
  Leaderboard,
  LeaderboardPaging,
  Map,
  PromoCharities,
  RecentFundraisers,
  SearchInput,
  ShareButton,
  Supporters,
  Tabs,
  TeamLeaderboard,
  Teams,
  TotalCalories,
  TotalCharities,
  TotalCustomMetric,
  TotalDistance,
  TotalDonations,
  TotalHours,
  TotalSupporters,
  UpcomingEvents
};

const modals = {
  AggregateSearch,
  CharitySearch,
  CharitySearchModalCustom,
  PageSearch
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
  widgets: widgets
};
