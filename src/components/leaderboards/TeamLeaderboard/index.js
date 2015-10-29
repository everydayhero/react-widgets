"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var cx                      = require('react/lib/cx');
var I18nMixin               = require('../../mixins/I18n');
var DOMInfoMixin            = require('../../mixins/DOMInfo');
var LeaderboardMixin        = require('../../mixins/Leaderboard');
var Icon                    = require('../../helpers/Icon');
var LeaderboardItem         = require('../LeaderboardItem');
var TeamLeaderboardItem     = require('../TeamLeaderboardItem');
var LeaderboardEmpty        = require('../LeaderboardEmpty');
var numeral                 = require('numeral');
var addEventListener        = require('../../../lib/addEventListener');
var removeEventListener     = require('../../../lib/removeEventListener');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  mixins: [I18nMixin, DOMInfoMixin, LeaderboardMixin],
  displayName: "TeamLeaderboard",
  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'nz', 'uk', 'us']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    childWidth: React.PropTypes.number,
    currencyFormat: React.PropTypes.string,
    i18n: React.PropTypes.object,
    altTemplate: React.PropTypes.bool,
    renderImage: React.PropTypes.bool,
    onHasContent: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      limit: 48,
      pageSize: 12,
      backgroundColor: null,
      textColor: null,
      childWidth: 250,
      altTemplate: false,
      renderImage: true,
      currencyFormat: '0[.]00 a',
      defaultI18n: {
        raisedTitle: 'Raised',
        membersTitle: 'Members',
        symbol: '$',
        heading: 'Top Teams',
        emptyText: 'There are no teams for this campaign yet. Be the first and create one now!',
        emptyButtonText: 'Start a team'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      boardData: [],
      currentPage: 1,
      childWidth: '',
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard('team');
  },

  componentDidMount: function() {
    addEventListener('resize', this.setChildWidth);
    this.setChildWidth();
  },

  componentWillUnmount: function() {
    removeEventListener('resize', this.setChildWidth);
  },

  setChildWidth: _.debounce(function() {
    this.setState({
      childWidth: this.getChildrenWidth(this.props.childWidth, this.props.pageSize)
    });
  }, 100, { trailing: true }),

  renderLoadingState: function() {
    return <Icon className="TeamLeaderboard__loading" icon="refresh" />;
  },

  renderEmptyState: function() {
    var emptyText       = this.t('emptyText');
    var emptyButtonText = this.t('emptyButtonText');

    return <LeaderboardEmpty emptyText={ emptyText } emptyButtonText={ emptyButtonText } { ...this.props } />;
  },

  renderLeaderboardItems: function() {
    var currentPage = this.state.currentPage - 1;
    var board = this.state.boardData[currentPage];

    return (
      <ReactCSSTransitionGroup
        transitionName="TeamLeaderboard__animation"
        component="ol"
        className="TeamLeaderboard__items">
        {
          board.map(function(item) {
            var formattedAmount = this.formatAmount(item.amount);
            var formattedRank = numeral(item.rank).format('0o');

            var El = this.props.altTemplate ? TeamLeaderboardItem : LeaderboardItem;
            var props = {
              key: item.id,
              name: item.name,
              rank: formattedRank,
              url: item.url,
              isoCode: item.isoCode,
              amount: formattedAmount,
              totalMembers: item.totalMembers,
              imgSrc: item.imgSrc,
              raisedTitle: this.t('raisedTitle'),
              membersTitle: this.t('membersTitle'),
              width: this.state.childWidth,
              renderImage: this.props.renderImage
            };

            return <El { ...props } />;
          }, this)
        }
      </ReactCSSTransitionGroup>
    );
  },

  render: function() {
    var state       = this.state;
    var heading     = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    var classes = cx({
      'TeamLeaderboard': true,
      'TeamLeaderboard--loading': state.isLoading,
      'TeamLeaderboard--empty': !state.boardData.length
    });

    var content = state.isLoading ? this.renderLoadingState :
                  state.boardData.length ? this.renderLeaderboardItems :
                  this.renderEmptyState;

    return (
      <div className={ classes } style={ customStyle }>
        <h3 className="TeamLeaderboard__heading">{ heading }</h3>
        { content() }
        { this.renderPaging() }
      </div>
    );
  }
});
