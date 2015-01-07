"use strict";

var _                   = require('lodash');
var React               = require('react');
var I18nMixin           = require('../../mixins/I18n');
var leaderboard         = require('../../../api/leaderboard');
var pages               = require('../../../api/pages');
var Icon                = require('../../helpers/Icon');
var TeamLeaderboardItem = require('../TeamLeaderboardItem');
var LeaderboardItem     = require('../LeaderboardItem');
var numeral             = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Leaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    currencyFormat: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: 24,
      pageSize: 12,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      format: '0[.]00 a',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        rankTitle: 'Ranked',
        symbol: '$',
        heading: 'Leaderboard > Top Individuals'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      pageIds: [],
      boardData: [],
      currentPage: 1
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard();
  },

  loadLeaderboard: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    leaderboard.find(props.campaignUid, props.type, props.limit, this.loadPages);
  },

  loadPages: function(result) {
    var pageIds = result.leaderboard.page_ids;
    this.setState({ pageIds: pageIds });

    pages.findByIds(pageIds, this.processLeaderboard);
  },

  processLeaderboard: function(pageData) {
    var leaderboard = _.map(this.state.pageIds, function(pageId, i) {
      var page = _.find(pageData.pages, {id: pageId});
      return this.processPage(page);
    }, this);

    this.rankLeaderboard(leaderboard);

    this.setState({
      isLoading: false,
      boardData: this.paginateLeaderboard(leaderboard)
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

  renderLeaderboardItems: function() {
    var boardData   = this.state.boardData;
    var currentPage = this.state.currentPage - 1;

    if (this.state.isLoading) {
      return <Icon className="Leaderboard__loading" icon="refresh" />;
    }

    return boardData[currentPage].map(function(d,i) {
      var formattedAmount = this.formatAmount(d.amount);
      var formattedRank = numeral(d.rank).format('0o');

      if (this.props.type === 'team') {
        return (
          <TeamLeaderboardItem
            key={ d.id }
            name={ d.name }
            url={ d.url }
            isoCode={ d.isoCode }
            amount={ formattedAmount }
            totalMembers={ d.totalMembers }
            imgSrc={ d.imgSrc }
            raisedTitle={ this.t('raisedTitle') }
            membersTitle={ this.t('membersTitle') } />
        );
      }

      return (
        <LeaderboardItem
          key={ d.id }
          rank={ formattedRank }
          rankTitle={ this.t('rankTitle') }
          name={ d.name }
          url={ d.url }
          isoCode={ d.isoCode }
          amount={ formattedAmount }
          imgSrc={ d.medImgSrc } />
      );

    }, this);
  },

  prevPage: function() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  },

  nextPage: function() {
    var totalPages = this.props.limit / this.props.pageSize;

    if (this.state.currentPage < totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  },

  switchPage: function(i) {
    this.setState({
      currentPage: i + 1
    });
  },

  renderIndicators: function() {
    if (!this.state.isLoading) {
      return this.state.boardData.map(function(d, i) {
        var iconClass;

        if (this.state.currentPage == i + 1) {
          iconClass = "circle";
        } else {
          iconClass = "circle-o";
        }

        return (
          <div key={ i } onClick={ this.switchPage.bind(null,i) } className="Leaderboard__indicator">
            <Icon className="Leaderboard__icon" icon={ iconClass } />
          </div>
        );

      }, this);
    }
  },

  render: function() {
    var limit       = this.props.limit;
    var pageSize    = this.props.pageSize;
    var heading     = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };
    var pageControls;

    if (limit > pageSize) {
      pageControls = (
        <div className="Leaderboard__controller">
          <div className="Leaderboard__indicators">
            { this.renderIndicators() }
          </div>
          <div className="Leaderboard__controls">
            <div onClick={ this.prevPage } className="Leaderboard__prevBtn">
              <Icon className="Leaderboard__icon" icon="caret-left"/>
            </div>
            <div onClick={ this.nextPage } className="Leaderboard__nextBtn">
              <Icon className="Leaderboard__icon" icon="caret-right"/>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="Leaderboard" style={ customStyle }>
        <h3 className="Leaderboard__heading">{ heading }</h3>
        <ol className="Leaderboard__items">
          { this.renderLeaderboardItems() }
        </ol>
        { pageControls }
      </div>
    );
  }
});
