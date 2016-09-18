import _ from 'lodash';
import React from 'react';
import numeral from 'numbro';
import campaigns from '../../api/campaigns';
import charities from '../../api/charities';
import LeaderboardPaging from '../leaderboards/LeaderboardPaging';
import paramJoin from '../../lib/paramJoin';

export default {
  getEndpoint() {
    let endpoint;
    let props = this.props;

    if(props.country) {
      if (props.campaignSlug) {
        endpoint = campaigns.leaderboardBySlug.bind(campaigns, props.country, props.campaignSlug);
      } else if (props.charitySlug) {
        endpoint = charities.leaderboardBySlug.bind(charities, props.country, props.charitySlug);
      }
    } else {
      if (props.campaignUids) {
        endpoint = campaigns.leaderboardByUids.bind(campaigns, props.campaignUids, props.charityUid);
      } else if (props.campaignUid && (!_.isEmpty(props.groupValues) || props.groupValue)) {
        endpoint = campaigns.leaderboardDynamic.bind(campaigns, props.campaignUid, props.groupValue);
      } else if (props.campaignUid) {
        endpoint = campaigns.leaderboard.bind(campaigns, props.campaignUid, props.charityUid);
      } else if (props.charityUid) {
        endpoint = charities.leaderboard.bind(charities, props.charityUid);
      }
    }

    if (!endpoint && console && console.log) {
      console.log("Leaderboard widget requires 'campaignUid' or 'charityUid'. If 'country' is given then 'campaignSlug' or 'charitySlug' may be used instead. ");
    }

    return (endpoint || function(type, limit, callback) { callback(null); });
  },

  loadLeaderboard(type) {
    this.setState({ isLoading: true });

    var groupValue = this.props.groupValue;
    if (this.props.groupValues && this.props.groupValues.length > 0) {
      groupValue = paramJoin(this.props.groupValues, '&groupValue[]');
    }

    var endpoint = this.getEndpoint();

    if (groupValue && this.props.campaignUid) {
      endpoint(this.processLeaderboard);
    } else {
      endpoint(type, this.props.limit, this.processLeaderboard, {
        includePages: true,
        groupValue: groupValue,
      });
    }
  },

  processLeaderboard(result) {
    let pages = [];
    if (result.results) {
      pages = result.results.map(function(object) {
        return object = object.page;
      });
    } else {
      // Static Leaderboard
      pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];
    }
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

  handleHasContentCallback(leaderboard) {
    let onHasContent = this.props.onHasContent;

    if (leaderboard.length > 0 && onHasContent) {
      onHasContent();
    }
  },

  getLeaderboard(pages) {
    return _.reduce(pages, function(result, page) {
      if (page.amount.cents > 0) {
        result.push({
          id: page.id,
          name: page.name,
          url: page.url,
          isoCode: page.amount.currency.iso_code,
          amount: page.amount.cents,
          totalMembers: (page.team_member_uids && page.team_member_uids.length) ? page.team_member_uids.length : null,
          imgSrc: page.image.large_image_url,
          medImgSrc: page.image.medium_image_url,
          charityName: page.charity_name
        });
      }
      return result;
    }, []);
  },

  rankLeaderboard(leaderboard) {
    let rank = 1;
    let prevItem = null;

    _.forEach(leaderboard, function(item, i) {
      if (prevItem && item.amount != prevItem.amount) {
        rank = i + 1;
      }

      item.rank = rank;
      prevItem = item;
    });
  },

  paginateLeaderboard(leaderboard) {
    let pageSize         = this.props.pageSize;
    let pagedLeaderboard = [];

    for (let i = 0; i < leaderboard.length; i += pageSize) {
      pagedLeaderboard.push(leaderboard.slice(i,i + pageSize));
    }

    return pagedLeaderboard;
  },

  formatAmount(amount) {
    return this.t('symbol') + numeral(amount / 100).format(this.props.currencyFormat);
  },

  prevPage() {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  },

  nextPage() {
    let totalPages  = this.props.limit / this.props.pageSize;
    let currentPage = this.state.currentPage;

    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  },

  renderPaging() {
    let pageCount = Math.ceil(this.state.resultCount / this.props.pageSize);

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
