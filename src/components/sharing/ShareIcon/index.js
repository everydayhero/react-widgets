import React from 'react';
import Icon from '../../helpers/Icon';
import openPopup from '../../../lib/openPopup';

export default React.createClass({
  displayName: "ShareIcon",
  propTypes: {
    name: React.PropTypes.oneOf(['facebook', 'twitter', 'googleplus', 'pinterest']).isRequired,
    icon: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  handleClick: function() {
    var popUpConfig = {
      toolbar: 0,
      status: 0,
      width: 640,
      height: 320
    };

    openPopup(this.props.url, popUpConfig);
  },

  render: function() {
    return (
      <div className={ 'ShareIcon ShareIcon__' + this.props.name } onClick={ this.handleClick }>
        <Icon icon={ this.props.icon } />
      </div>
    );
  }
});
