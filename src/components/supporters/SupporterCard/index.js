"use strict";

var React                = require('react');
var SupporterCardGiveNow = require('../SupporterCardGiveNow');
var Footprint            = require('../../footprint/Footprint');

module.exports = React.createClass({
  displayName: 'SupporterCard',

  propTypes: {
    footprint: React.PropTypes.array,
    image: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    target: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired,
    currency: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired
  },

  render: function() {
    var props = this.props;
    var style = {
      width: props.width
    };

    return (
      <div className="SupporterCardWrapper" style={ style }>
        <div className="SupporterCard">
          <Footprint
            data={ props.footprint }
            compact={ true }
            size={ 120 }
            userImage={ props.image }
            userName={ props.name }
            userUrl={ props.url } />

          <a href={ props.url } className="SupporterCard__userName">{ props.name }</a>

          <SupporterCardGiveNow
            url={ props.url }
            target={ props.target }
            current={ props.current }
            i18n={{ currency: props.currency }} />
        </div>
      </div>
    );
  }
});
