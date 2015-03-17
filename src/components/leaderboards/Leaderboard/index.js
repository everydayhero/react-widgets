"use strict";

var _                   = require('lodash');
var React               = require('react');
var cx                  = require('react/lib/cx');
var I18nMixin           = require('../../mixins/I18n');
var DOMInfoMixin        = require('../../mixins/DOMInfo');
var campaigns           = require('../../../api/campaigns');
var charities           = require('../../../api/charities');
var pages               = require('../../../api/pages');
var Icon                = require('../../helpers/Icon');
var TeamLeaderboardItem = require('../TeamLeaderboardItem');
var LeaderboardItem     = require('../LeaderboardItem');
var numeral             = require('numeral');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

module.exports = React.createClass({
  mixins: [I18nMixin, DOMInfoMixin],
  displayName: "Leaderboard",
  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'nz', 'uk', 'us']),
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
      type: 'individual',
      limit: 48,
      pageSize: 12,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      currencyFormat: '0,0[.]00',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        symbol: '$',
        heading: 'Top Individuals'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      boardData: [],
      currentPage: 1,
      itemWidth: '',
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard();
  },

  componentDidMount: function() {
    addEventListener(window, 'resize', this.setItemWidth);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'resize', this.setItemWidth);
  },

  setItemWidth: _.debounce(function() {
    this.setState({
      itemWidth: this.getChildrenWidth(250, this.props.pageSize)
    });
  }, 100),

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

  loadLeaderboard: function() {
    this.setState({
      isLoading: true
    });

    var endpoint = this.getEndpoint();
    endpoint(this.props.type, this.props.limit, this.processLeaderboard, { includePages: true });
  },

  processLeaderboard: function(result) {
    var pages = result && result.leaderboard && result.leaderboard.pages ? result.leaderboard.pages : [];
    var leaderboard = _.map(pages, this.processPage);

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
    if (this.state.isLoading) {
      return <Icon className="Leaderboard__loading" icon="refresh" />;
    }

    var currentPage = this.state.currentPage - 1;
    var board = this.state.boardData[currentPage];

    if (!board) {
      return;
    }

    return board.map(function(d,i) {
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
          name={ d.name }
          url={ d.url }
          isoCode={ d.isoCode }
          amount={ formattedAmount }
          imgSrc={ d.medImgSrc }
          width={ this.state.itemWidth } />
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

  renderPrevBtn: function() {
    var classes = cx({
      "Leaderboard__prevBtn": true,
      "Leaderboard__prevBtn--active": this.state.currentPage > 1
    });

    return (
      <div onClick={ this.prevPage } className={ classes }>
        <Icon className="Leaderboard__icon" icon="caret-left"/>
      </div>
    );
  },

  renderNextBtn: function() {
    var pageCount = this.props.limit / this.props.pageSize;
    var currentPage = this.state.currentPage;

    var classes = cx({
      "Leaderboard__nextBtn": true,
      "Leaderboard__nextBtn--active": currentPage < pageCount
    });

    return (
      <div onClick={ this.nextPage } className={ classes }>
        <Icon className="Leaderboard__icon" icon="caret-right"/>
      </div>
    );
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
            { this.renderPrevBtn() }
            { this.renderNextBtn() }
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
