"use strict";

var _                  = require('lodash');
var React              = require('react');
var I18nMixin          = require('../../mixins/I18n');
var leaderboard        = require('../../../api/leaderboard');
var pages              = require('../../../api/pages');
var Icon               = require('../../helpers/Icon');
var MMFLeaderboardItem = require('../MMFLeaderboardItem');
var numeral            = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "MMFLeaderboard",
  propTypes: {
    campaignUid: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['team', 'individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'individual',
      limit: 24,
      pageSize: 24,
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
      pageIds: [],
      boardData: [],
      pagedBoardData: [],
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

    this.setState({
      pageIds: pageIds
    });

    pages.findByIds(pageIds, this.processLeaderboard);
  },

  processLeaderboard: function(pageData) {
    var leaderboard = _.map(this.state.pageIds, function(pageId, i) {
      var page = _.find(pageData.pages, {id: pageId});
      return this.processPage(page);
    }, this);

    console.log(leaderboard);

    this.rankLeaderboard(leaderboard);

    this.setState({
      isLoading: false,
      boardData: this.paginateLeaderboard(leaderboard)
    });
  },

  processPage: function(page) {
    if (page.fitness_activity_overview !== null) {
      var new_fitness_activity_overview = {
        duration_in_seconds: 0,
        calories: 0,
        distance_in_meters: 0
      };

      // Combines all fitness activity in to one rather than splitting by each activity.
      Object.keys(page.fitness_activity_overview).forEach(function (key) {
        var fitness_activity_overview = page.fitness_activity_overview[key];
        new_fitness_activity_overview.duration_in_seconds += fitness_activity_overview.duration_in_seconds;
        new_fitness_activity_overview.calories += fitness_activity_overview.calories;
        new_fitness_activity_overview.distance_in_meters += fitness_activity_overview.distance_in_meters;
      });

      page.fitness_activity_overview = new_fitness_activity_overview;
    }

    return {
      id: page.id,
      name: page.name,
      url: page.url,
      isoCode: page.amount.currency.iso_code,
      amount:  page.amount.cents,
      totalMembers: page.team_member_uids.length,
      imgSrc: page.image.large_image_url,
      medImgSrc: page.image.medium_image_url,
      duration_in_seconds: page.fitness_activity_overview.duration_in_seconds,
      calories: page.fitness_activity_overview.calories,
      distance_in_meters: page.fitness_activity_overview.distance_in_meters
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

  renderLeaderboardItems: function() {
    var boardData   = this.state.boardData;
    var currentPage = this.state.currentPage - 1;
    var symbol      = this.t('symbol');

    if (this.state.isLoading) {
      return <Icon className="Leaderboard__loading" icon="refresh" />;
    }

    return boardData[currentPage].map(function(d,i) {
      var formattedAmount = symbol + numeral(d.amount / 100).format('0[.]00 a');
      var formattedRank = numeral(d.rank).format('0o');

      return (
        <MMFLeaderboardItem
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
        <div className="MMFLeaderboard__controller">
          <div className="MMFLeaderboard__indicators">
            { this.renderIndicators() }
          </div>
          <div className="MMFLeaderboard__controls">
            <div onClick={ this.prevPage } className="Leaderboard__prevBtn">
              <Icon className="MMFLeaderboard__icon" icon="caret-left"/>
            </div>
            <div onClick={ this.nextPage } className="Leaderboard__nextBtn">
              <Icon className="MMFLeaderboard__icon" icon="caret-right"/>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="MMFLeaderboard" style={ customStyle }>
        <h3 className="MMFLeaderboard__heading">{ heading }</h3>

        <div className="MMFLeaderboard__headings">
          <div className="MMFLeaderboard__heading-image"></div>
          <div className="MMFLeaderboard__heading-name">Name</div>
          <div className="MMFLeaderboard__heading-time">Time Invested</div>
          <div className="MMFLeaderboard__heading-calories">Calories Burned</div>
          <div className="MMFLeaderboard__heading-distance">Distance Moved</div>
        </div>
        <div className="MMFLeaderboard__items">
          { this.renderLeaderboardItems() }
        </div>
        { pageControls }
      </div>
    );
  }
});
