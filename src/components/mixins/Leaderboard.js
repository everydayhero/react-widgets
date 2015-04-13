"use strict";

var _                 = require('lodash');
var React             = require('react');
var cx                = require('react/lib/cx');
var Icon              = require('../helpers/Icon');
var numeral           = require('numeral');
var campaigns         = require('../../api/campaigns');
var charities         = require('../../api/charities');
var LeaderboardPaging = require('../leaderboards/LeaderboardPaging');
var Emitter           = require('../../lib/EventEmitter');

module.exports = {
  getEndpoint: function() {
    var endpoint;
    var props = this.props;

    if (props.country) {
      if (props.campaignSlug) { endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug); }
      if (props.charitySlug)  { endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug); }
    } else {
      if (props.campaignUid)  { endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid); }
      if (props.charityUid)   { endpoint = charities.leaderboard.bind(charities, props.charityUid); }
    }

    if (!endpoint && console && console.log) {
      console.log("Leaderboard widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadLeaderboard: function(type) {
    this.setState({
      isLoading: true
    });

    var endpoint = this.getEndpoint();
    endpoint(type, this.props.limit, this.processLeaderboard, { includePages: true });
  },

  processLeaderboard: function(result) {
    var props = this.props;
    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];
    var leaderboard = _.map(pages, this.processPage);
    var id = props.id;
    var eventType = props.eventType;
    var eventId = id + '/' + eventType;

    if (leaderboard.length > 0) {
      Emitter.emit(eventId, {id: id, hasContent: true});
    } else {
      Emitter.emit(eventId, {id: id, hasContent: false});
    }

    this.rankLeaderboard(leaderboard);

    this.setState({
      isLoading: false,
      boardData: this.paginateLeaderboard(leaderboard),
      childWidth: this.getChildrenWidth(this.props.childWidth, this.props.pageSize)
    });
  },

  processPage: function(page) {
    return {
      id: page.id,
      name: page.name,
      url: page.url,
      isoCode: page.amount.currency.iso_code,
      amount:  page.amount.cents,
      totalMembers: page.team_member_uids.length,
      imgSrc: page.image.large_image_url,
      medImgSrc: page.image.medium_image_url
    };
  },

  rankLeaderboard: function(leaderboard) {
    var rank = 1;
    var prevItem = null;

    _.forEach(leaderboard, function(item, i) {
      if (prevItem && item.amount != prevItem.amount) {
        rank = i + 1;
      }

      item.rank = rank;
      prevItem = item;
    });
  },

  paginateLeaderboard: function(leaderboard) {
    var pageSize         = this.props.pageSize;
    var pagedLeaderboard = [];

    for (var i = 0; i < leaderboard.length; i += pageSize) {
      pagedLeaderboard.push(leaderboard.slice(i,i + pageSize));
    }

    return pagedLeaderboard;
  },

  formatAmount: function(amount) {
    return this.t('symbol') + numeral(amount / 100).format(this.props.currencyFormat);
  },

  prevPage: function() {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  },

  nextPage: function() {
    var totalPages  = this.props.limit / this.props.pageSize;
    var currentPage = this.state.currentPage;

    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  },

  renderPaging: function() {
    var pageCount = this.props.limit / this.props.pageSize;

    if (!this.state.isLoading && pageCount > 1) {
      return (
        <LeaderboardPaging
          nextPage={ this.nextPage }
          prevPage={ this.prevPage }
          currentPage={ this.state.currentPage }
          pageCount={ pageCount } />
      );
    }
  }
};
