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
    charitySlug: React.PropTypes.string,
    charityUid: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']),
    type: React.PropTypes.oneOf(['individual']),
    limit: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    childWidth: React.PropTypes.number,
    currencyFormat: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      type: 'individual',
      limit: 48,
      pageSize: 12,
      backgroundColor: null,
      textColor: null,
      childWidth: 250,
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
      childWidth: this.props.childWidth,
    };
  },

  componentDidMount: function() {
    addEventListener(window, 'resize', this.setChildWidth);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'resize', this.setChildWidth);
  },

  setChildWidth: _.debounce(function() {
    this.setState({
      childWidth: this.getChildrenWidth(this.props.childWidth, this.props.pageSize)
    });
  }, 100),

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

      return (
        <LeaderboardItem
          key={ d.id }
          rank={ formattedRank }
          name={ d.name }
          url={ d.url }
          isoCode={ d.isoCode }
          amount={ formattedAmount }
          imgSrc={ d.medImgSrc }
          width={ this.state.childWidth } />
      );

    }, this);
  },

  render: function() {
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
        { this.renderPaging() }
      </div>
    );
  }
});
