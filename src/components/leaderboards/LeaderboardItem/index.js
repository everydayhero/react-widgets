"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'LeaderboardItem',

  propTypes: {
    rank: React.PropTypes.string,
    imgSrc: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    isoCode: React.PropTypes.string.isRequired,
    amount: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    renderImage: React.PropTypes.bool.isRequired
  },

  renderProfileImage: function() {
    if (this.props.renderImage) {
      return (
        <div className="LeaderboardItem__image">
          <img src={ this.props.imgSrc } />
        </div>
      );
    }
  },

  render: function() {
    var style = { width: this.props.width };

    return (
      <a href={ this.props.url } className="LeaderboardItem" style={ style }>
        <div className="LeaderboardItem__skin">
          { this.renderProfileImage() }
          <div className="LeaderboardItem__content">
            <div className="LeaderboardItem__name">
              { this.props.name }
            </div>
            <div className="LeaderboardItem__amount">
              { this.props.amount }
            </div>
          </div>
          <div className="LeaderboardItem__rank">
            { this.props.rank }
          </div>
        </div>
      </a>
    );
  }
});
