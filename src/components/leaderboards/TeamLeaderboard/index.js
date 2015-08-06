"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var I18nMixin               = require('../../mixins/I18n');
var DOMInfoMixin            = require('../../mixins/DOMInfo');
var LeaderboardMixin        = require('../../mixins/Leaderboard');
var Icon                    = require('../../helpers/Icon');
var LeaderboardItem         = require('../LeaderboardItem');
var TeamLeaderboardItem     = require('../TeamLeaderboardItem');
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
        heading: 'Top Teams'
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

  renderLeaderboardItems: function() {
    var currentPage = this.state.currentPage - 1;
    var board = this.state.boardData[currentPage];

    if (this.state.isLoading) {
      return <Icon className="TeamLeaderboard__loading" icon="refresh" />;
    }

    if (!board) {
      return;
    }

    return board.map(function(d,i) {
      var formattedAmount = this.formatAmount(d.amount);
      var formattedRank = numeral(d.rank).format('0o');

      var El = this.props.altTemplate ? TeamLeaderboardItem : LeaderboardItem;
      var props = {
        key: d.id,
        name: d.name,
        rank: formattedRank,
        url: d.url,
        isoCode: d.isoCode,
        amount: formattedAmount,
        totalMembers: d.totalMembers,
        imgSrc: d.imgSrc,
        raisedTitle: this.t('raisedTitle'),
        membersTitle: this.t('membersTitle'),
        width: this.state.childWidth,
        renderImage: this.props.renderImage
      };

      return (
        <El { ...props } />
      );

    }, this);
  },

  renderLeaderboard: function() {
    var heading     = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="TeamLeaderboard" style={ customStyle }>
        <h3 className="TeamLeaderboard__heading">{ heading }</h3>
        <ol className="TeamLeaderboard__items">
          <ReactCSSTransitionGroup transitionName="TeamLeaderboard__animation" component="div">
            { this.renderLeaderboardItems() }
          </ReactCSSTransitionGroup>
        </ol>
        { this.renderPaging(this.state.resultCount, this.props.pageSize) }
      </div>
    );
  },

  render: function() {
    var state = this.state;

    if (state.isLoading || state.boardData.length > 0) {
      return (this.renderLeaderboard());
    } else {
      return null;
    }
  }
});
