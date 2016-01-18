"use strict";

var _                       = require('lodash');
var React                   = require('react/addons');
var cx                      = require('react/lib/cx');
var I18nMixin               = require('../../mixins/I18n');
var DOMInfoMixin            = require('../../mixins/DOMInfo');
var LeaderboardMixin        = require('../../mixins/Leaderboard');
var Icon                    = require('../../helpers/Icon');
var LeaderboardItem         = require('../LeaderboardItem');
var LeaderboardEmpty        = require('../LeaderboardEmpty');
var CallToActionButton      = require('../../callstoaction/CallToActionButton');
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
    groupValues: React.PropTypes.array,
    groupValue: React.PropTypes.string,
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
      groupValue: '',
      groupValues: [],
      defaultI18n: {
        symbol: '$',
        heading: 'Top Individuals',
        emptyText: 'There are no individual supporters for this campaign yet. Be the first and register now!',
        emptyButtonText: 'Register'
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

  renderLoadingState: function() {
    return <Icon className="Leaderboard__loading" icon="refresh" />;
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
        className="Leaderboard__items"
        transitionName="Leaderboard__animation"
        component="ol">
          {
            board.map(function(item) {
              var formattedAmount = this.formatAmount(item.amount);
              var formattedRank   = numeral(item.rank).format('0o');

              return (
                <LeaderboardItem
                  key={ item.id }
                  rank={ formattedRank }
                  name={ item.name }
                  url={ item.url }
                  isoCode={ item.isoCode }
                  amount={ formattedAmount }
                  imgSrc={ item.medImgSrc }
                  width={ this.state.childWidth }
                  renderImage={ this.props.renderImage } />
              );
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
      'Leaderboard': true,
      'Leaderboard--loading': state.isLoading,
      'Leaderboard--empty': !state.boardData.length
    });

    var content = state.isLoading ? this.renderLoadingState :
                  state.boardData.length ? this.renderLeaderboardItems :
                  this.renderEmptyState;

    return (
      <div className={ classes } style={ customStyle }>
        <h3 className="Leaderboard__heading">{ heading }</h3>
        { content() }
        { this.renderPaging() }
      </div>
    );
  }
});
