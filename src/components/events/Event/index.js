'use strict';

var React               = require('react');
var I18n                = require('../../mixins/I18n');
var effect              = require('../../../lib/effect');
var CallToActionButton  = require('../../callstoaction/CallToActionButton');

function cssUrl(url) {
  return url ? 'url(' + url + ')' : 'none';
}

module.exports = React.createClass({
  displayName: 'Event',
  mixins: [I18n],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    campaignUrl: React.PropTypes.string.isRequired,
    getStartedUrl: React.PropTypes.string.isRequired,
    backgroundImageUrl: React.PropTypes.string,
    supporterCount: React.PropTypes.number.isRequired,
    width: React.PropTypes.string.isRequired,
    i18n: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      defaultI18n: {
        joinLabel: 'Join Event',
        supportersLabel: 'Supporters',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
  },

  getInitialState: function() {
    return {
      activeClass: '',
      base64BlurredBackgroundImage: ''
    };
  },

  componentWillMount: function() {
    if (this.props.backgroundImageUrl) {
      var backgroundImage = document.createElement('img');
      backgroundImage.setAttribute('crossorigin', 'anonymous');
      backgroundImage.src = this.props.backgroundImageUrl;
      backgroundImage.onload = this.blurBackgroundImage.bind(this, backgroundImage);
    }
  },

  blurBackgroundImage: function(backgroundImage) {
    this.setState({
      base64BlurredBackgroundImage: effect.blurImage(backgroundImage, 40)
    });
  },

  activate: function() {
    this.setState({ activeClass: 'active' });
  },

  activateAndTimeout: function() {
    this.activate();
    this.timeout();
  },

  timeout: function() {
    var component = this;
    setTimeout(function() { component.deactivate(); }, 3000);
  },

  deactivate: function() {
    this.setState({ activeClass: '' });
  },

  eventStyles: function() {
    return {
      width: this.props.width
    };
  },

  blurStyles: function() {
    return {
      backgroundImage: cssUrl(this.state.base64BlurredBackgroundImage),
      backgroundSize: 'cover'
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var date = props.date;
    var bg = cssUrl(props.backgroundImageUrl);
    var blur = cssUrl(state.base64BlurredBackgroundImage);
    var t = this.t;

    return (
      <div className="Event" style={ this.eventStyles() }
        onTouchStart={ this.activateAndTimeout }
        onTouchCancel={ this.deactivate }
        onMouseEnter={ this.activate }
        onMouseLeave={ this.deactivate }>
        <div className={ "Event__base " + this.state.activeClass } style={{ backgroundImage: bg }}>
          <div className="Event__blur" style={{ backgroundImage: blur }}></div>
          <div className="Event__gradient"></div>
          <ul className="Event__date">
            <li>{ date.getDate() }</li>
            <li>{ t('months')[date.getMonth()] }</li>
            <li>{ date.getFullYear() }</li>
          </ul>
          <a href={ props.campaignUrl } className="Event__name">{ props.name }</a>
          <p className="Event__supporter-count">{ (props.supporterCount || 0) + ' ' + t('supportersLabel') }</p>
          <CallToActionButton kind="secondary" reverse={ true } href={ props.getStartedUrl } className="Event__join-event">{ t('joinLabel') }</CallToActionButton>
        </div>
      </div>
    );
  }
});
