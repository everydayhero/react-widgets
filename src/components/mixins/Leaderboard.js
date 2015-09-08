"use strict";

var _                 = require('lodash');
var React             = require('react');
var cx                = require('react/lib/cx');
var Icon              = require('../helpers/Icon');
var numeral           = require('numeral');
var campaigns         = require('../../api/campaigns');
var charities         = require('../../api/charities');
var LeaderboardPaging = require('../leaderboards/LeaderboardPaging');

module.exports = {
  getEndpoint: function() {
    var endpoint;
    var props = this.props;

    if (props.country) {
      if (props.campaignSlug) { endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug); }
      else if (props.charitySlug) { endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug); }
    } else {
      if (props.campaignUids) { endpoint = campaigns.leaderboardByUids.bind(campaigns, props.campaignUids, props.charityUid); }
      else if (props.campaignUid) { endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid, props.charityUid); }
      else if (props.charityUid)  { endpoint = charities.leaderboard.bind(charities, props.charityUid); }
    }

    if (!endpoint && console && console.log) {
      console.log("Leaderboard widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadLeaderboard: function(type) {
    this.setState({ isLoading: true });

    var endpoint = this.getEndpoint();
    endpoint(type, this.props.limit, this.processLeaderboard, { includePages: true });
  },

  processLeaderboard: function(result) {
    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];
    var leaderboard = this.getLeaderboard(pages);

    this.rankLeaderboard(leaderboard);
    this.handleHasContentCallback(leaderboard);

    this.setState({
      isLoading: false,
      resultCount: pages.length,
      boardData: this.paginateLeaderboard(leaderboard),
      childWidth: this.getChildrenWidth(this.props.childWidth, this.props.pageSize)
    });
  },

  handleHasContentCallback: function(leaderboard) {
    var onHasContent = this.props.onHasContent;

    if (leaderboard.length > 0 && onHasContent) {
      onHasContent();
    }
  },

  getLeaderboard: function(pages) {
    return _.reduce(pages, function(result, page) {
      if (page.amount.cents > 0) {
        result.push({
          id: page.id,
          name: page.name,
          url: page.url,
          isoCode: page.amount.currency.iso_code,
          amount:  page.amount.cents,
          totalMembers: page.team_member_uids.length,
          imgSrc: page.image.large_image_url,
          medImgSrc: page.image.medium_image_url
        });
      }
      return result;
    }, []);
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
    var pageCount = Math.ceil(this.state.resultCount / this.props.pageSize);

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
