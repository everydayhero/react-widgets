'use strict';

var React = require('react');
var I18n = require('../../mixins/I18n');
var effect = require('../../../lib/effect');

module.exports = React.createClass({
  displayName: 'Event',
  mixins: [I18n],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    getStartedUrl: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    backgroundImageUrl: React.PropTypes.string.isRequired,
    supporterCount: React.PropTypes.number.isRequired,
    i18n: React.PropTypes.object,
  },

  // () -> Object
  getDefaultProps: function() {
    return {
      defaultI18n: {
        joinLabel: 'Join Event',
        supportersLabel: 'Supporters',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
  },

  // () -> Object
  getInitialState: function() {
    return {
      base64BlurredBackgroundImage: ''
    };
  },

  // () -> ()
  componentWillMount: function() {
    var _this = this;
    var backgroundImage = document.createElement('img');
    backgroundImage.setAttribute('crossorigin', 'anonymous');
    backgroundImage.src = this.props.backgroundImageUrl;
    backgroundImage.onload = function() {
      _this.setState({
        base64BlurredBackgroundImage: effect.blurImage(backgroundImage, 30)
      });
    };
  },

  // () -> XJS
  render: function() {
    var baseStyles = {
      background: this.props.backgroundColor + ' url(' + this.props.backgroundImageUrl + ')',
      backgroundSize: 'cover'
    };

    var blurStyles = {
      backgroundImage: 'url(' + this.state.base64BlurredBackgroundImage + ')',
      backgroundSize: 'cover'
    };

    var date = this.props.date;

    return (
      <div className="Event">
        <a href={ this.props.getStartedUrl }>
          <div className="Event__base" style={ baseStyles }>
            <div className="Event__blur" style={ blurStyles }></div>
            <div className="Event__gradient"></div>
            <ul className="Event__date">
              <li>{ date.getDate() }</li>
              <li>{ this.t('months')[date.getMonth()] }</li>
              <li>{ date.getFullYear() }</li>
            </ul>
            <p className="Event__name">{ this.props.name }</p>
            <p className="Event__supporter-count">{ (this.props.supporterCount || 0) + ' ' + this.t('supportersLabel') }</p>
            <p className="Event__join-event">{ this.t('joinLabel') }</p>
          </div>
        </a>
      </div>
    );
  }
});
