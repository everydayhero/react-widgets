/** @jsx React.DOM */
"use strict";

var _                     = require('lodash');
var React                 = require('react');
var I18nMixin             = require('../../mixins/I18n');
var leaderboard           = require('../../../api/leaderboard');
var pages                 = require('../../../api/pages');
var Icon                  = require('../../helpers/Icon');
var TeamLeaderboardItem   = require('../TeamLeaderboardItem');
var LeaderboardItem       = require('../LeaderboardItem');
var numeral               = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Leaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: '24',
      pageSize: 12,
      backgroundColor: '#525252',
      textColor: '#FFFFFF',
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
        id: page.id,
        name: page.name,
        iso_code: page.amount.currency.iso_code,
        amount:  symbol + numeral(page.amount.cents / 100).format('0[.]00 a'),
        totalMembers: page.team_member_uids.length,
        imgSrc: page.image.large_image_url,
        smallImgSrc: page.image.small_image_url
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
    var rank = 0;

    if (this.state.isLoading) {
      return (
        <Icon className="Leaderboard__loading" icon="refresh" spin={ true }/>
      );
    }

    return this.state.boardData[currentPage].map(function(d,i) {
      rank = numeral(i + 1 + (currentPage * this.props.pageSize)).format('0o');

      if (this.props.type === 'team') {
        return (
          <TeamLeaderboardItem
            key={ d.id }
            name={ d.name }
            iso_code={ d.iso_code }
            amount={ d.amount }
            totalMembers={ d.totalMembers }
            imgSrc={ d.imgSrc }
            raisedTitle={ this.t('raisedTitle') }
            membersTitle={ this.t('membersTitle') } />
        );
      }

      return (
        <LeaderboardItem
          key={ d.id }
          rank={ rank }
          rankTitle={ this.t('rankTitle') }
          name={ d.name }
          iso_code={ d.iso_code }
          amount={ d.amount }
          imgSrc={ d.smallImgSrc } />
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
      return this.state.boardData.map(function(d, i) {

        if (this.state.currentPage == i + 1) {
          var iconClass = "circle";
        } else {
          var iconClass = "circle-o";
        }

        return (
          <div key={ i } onClick={ this.switchPage.bind(null,i) } className="Leaderboard__indicator">
            <Icon className="Leaderboard__icon" icon={ iconClass } />
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
      <div className="Leaderboard" style={ customStyle }>
        <h3 className="Leaderboard__heading">{ heading }</h3>
        <ol className="Leaderboard__items">
          { this.renderLeaderboardItems() }
        </ol>
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
      </div>
    );
  }
});
