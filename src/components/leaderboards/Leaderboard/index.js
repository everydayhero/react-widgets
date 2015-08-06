"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var I18nMixin               = require('../../mixins/I18n');
var DOMInfoMixin            = require('../../mixins/DOMInfo');
var LeaderboardMixin        = require('../../mixins/Leaderboard');
var Icon                    = require('../../helpers/Icon');
var LeaderboardItem         = require('../LeaderboardItem');
var numeral                 = require('numeral');
var addEventListener        = require('../../../lib/addEventListener');
var removeEventListener     = require('../../../lib/removeEventListener');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  mixins: [I18nMixin, DOMInfoMixin, LeaderboardMixin],
  displayName: "Leaderboard",
  propTypes: {
    campaignSlug: React.PropTypes.string,
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    childWidth: React.PropTypes.number,
    currencyFormat: React.PropTypes.string,
    renderImage: React.PropTypes.bool,
    i18n: React.PropTypes.object,
    onHasContent: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      limit: 48,
      pageSize: 12,
      backgroundColor: null,
      textColor: null,
      childWidth: 250,
      renderImage: true,
      currencyFormat: '0,0[.]00',
      defaultI18n: {
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
      childWidth: this.props.childWidth
    };
  },

  componentWillMount: function() {
    this.loadLeaderboard('individual');
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
    if (this.state.isLoading) {
      return <Icon className="Leaderboard__loading" icon="refresh" />;
    }

    var currentPage = this.state.currentPage - 1;
    var board = this.state.boardData[currentPage];

    if (!board) return;

    return board.map(function(d,i) {
      var formattedAmount = this.formatAmount(d.amount);
      var formattedRank = numeral(d.rank).format('0o');

      return (
        <LeaderboardItem
          key={ d.id }
          rank={ formattedRank }
          name={ d.name }
          url={ d.url }
          isoCode={ d.isoCode }
          amount={ formattedAmount }
          imgSrc={ d.medImgSrc }
          width={ this.state.childWidth }
          renderImage={ this.props.renderImage } />
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
      <div className="Leaderboard" style={ customStyle }>
        <h3 className="Leaderboard__heading">{ heading }</h3>
        <ol className="Leaderboard__items">
          <ReactCSSTransitionGroup transitionName="Leaderboard__animation" component="div">
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
