import React from 'react';

export default React.createClass({
  displayName: 'LeaderboardItem',

  propTypes: {
    rank: React.PropTypes.string,
    imgSrc: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    isoCode: React.PropTypes.string.isRequired,
    amount: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    renderImage: React.PropTypes.bool.isRequired,
    charityName: React.PropTypes.string
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

  renderCharityName: function() {
    if (this.props.charityName) {
      return (
        <div className="LeaderboardItem__charity">
          { this.props.charityName }
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
            { this.renderCharityName() }
          </div>
          <div className="LeaderboardItem__rank">
            { this.props.rank }
          </div>
        </div>
      </a>
    );
  }
});
