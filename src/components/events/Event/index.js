'use strict';

var React = require('react');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = React.createClass({
  displayName: 'Event',

  // () -> XJS
  render: function() {
    var baseStyles = {
      background: this.props.backgroundColor + ' url(' + this.props.backgroundImageUrl + ')',
      backgroundSize: 'cover'
    };
    var date = this.props.date;

    return (
      <div className="Event">
        <div className="Event__base" style={ baseStyles }>
          <div className="Event__gradient"></div>
          <ul className="Event__date">
            <li>{ date.getDate() }</li>
            <li>{ months[date.getMonth()] }</li>
            <li>{ date.getFullYear() }</li>
          </ul>
          <p className="Event__name">{ this.props.name }</p>
        </div>
        <div className="Event__hover">
          <p className="Event_supporter-count">{ this.props.supporterCount }</p>
        </div>
      </div>
    );
  }
});
