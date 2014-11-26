"use strict";

var React         = require('react');

module.exports = React.createClass({
  displayName: 'FundraiserImage',

  render: function() {
    return (
      <a href={ this.props.pageUrl } title={ this.props.imgTitle } className="FundraiserImage">
        <img src={ this.props.imgSrc } alt={ this.props.imgTitle } />
      </a>
    );
  }
});
