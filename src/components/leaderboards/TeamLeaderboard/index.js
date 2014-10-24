/** @jsx React.DOM */
"use strict";

var _                     = require('lodash');
var React                 = require('react');
var I18nMixin             = require('../../mixins/I18n');
var leaderboard           = require('../../../api/leaderboard');
var pages                 = require('../../../api/pages');
var Icon                  = require('../../helpers/Icon');
var TeamLeaderboardItem   = require('../TeamLeaderboardItem')
var numeral               = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "TeamLeaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string,
    type: React.PropTypes.string,
    limit: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'team',
      limit: '12',
      pageSize: 4,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        symbol: '$',
        heading: 'Leaderboard > Top Teams'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      teamPageIds: [],
      boardData: [],
      pagedBoardData: [],
      currentPage: 1
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    leaderboard.find(props.campaignUid, props.type, props.limit, this.hasTeamPages);
  },

  hasTeamPages: function(result) {
    this.setState({
      teamPageIds: result.leaderboard.page_ids
    });

    pages.findByIds(this.state.teamPageIds, this.getPageData);
  },

  getPageData: function(page_data) {
    var symbol           = this.t('symbol');
    var pageSize         = this.props.pageSize;
    var pagedLeaderboard = [];

    var leaderboard = _.map(this.state.teamPageIds, function(page_id) {
      var page = _.filter(page_data.pages, {id: page_id})[0];

      return {
        name: page.name,
        iso_code: page.amount.currency.iso_code,
        amount:  symbol + numeral(page.amount.cents / 100).format('0[.]00 a'),
        totalMembers: page.team_member_uids.length,
        imgSrc: page.image.large_image_url
      }
    });

    for (var i = 0; i < leaderboard.length; i += pageSize) {
      pagedLeaderboard.push(leaderboard.slice(i,i + pageSize));
    }

    this.onComplete(pagedLeaderboard);
  },

  onComplete: function(data) {
    this.setState({
      isLoading: false,
      boardData: data
    });
  },

  renderLeaderboardItems: function() {
    var currentPage = this.state.currentPage - 1;

    if (this.state.isLoading) {
      return (
        <Icon className="TeamLeaderboard__loading" icon="refresh" spin={ true }/>
      );
    } else {
      if (this.state.boardData[currentPage].length > 0) {
        return this.state.boardData[currentPage].map(function(d) {
          return (
            <TeamLeaderboardItem
              name={ d.name }
              iso_code={ d.iso_code }
              amount={ d.amount }
              totalMembers={ d.totalMembers }
              imgSrc={ d.imgSrc }
              raisedTitle={ this.t('raisedTitle') }
              membersTitle={ this.t('membersTitle') } />
          )
        }, this);
      }
    }
  },

  prevPage: function() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  },

  nextPage: function() {
    var totalPages = parseInt(this.props.limit) / this.props.pageSize;

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
      return this.state.boardData.map(function(d,i) {

        if (this.state.currentPage == i + 1) {
          var iconClass = "circle";
        } else {
          var iconClass = "circle-o";
        }

        return (
          <div onClick={ this.switchPage.bind(null,i) } className="TeamLeaderboard__indicator">
            <Icon className="TeamLeaderboard__icon" icon={ iconClass } />
          </div>
        )

      }, this);
    }
  },

  render: function() {
    var heading = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    }

    return (
      <div className="TeamLeaderboard" style={ customStyle }>
        <h3 className="TeamLeaderboard__heading">{ heading }</h3>
        <ol className="TeamLeaderboard__items">
          { this.renderLeaderboardItems() }
        </ol>
        <div className="TeamLeaderboard__controller">
          <div className="TeamLeaderboard__indicators">
            { this.renderIndicators() }
          </div>
          <div className="TeamLeaderboard__controls">
            <div onClick={ this.prevPage } className="TeamLeaderboard__prevBtn">
              <Icon className="TeamLeaderboard__icon" icon="caret-left"/>
            </div>
            <div onClick={ this.nextPage } className="TeamLeaderboard__nextBtn">
              <Icon className="TeamLeaderboard__icon" icon="caret-right"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
