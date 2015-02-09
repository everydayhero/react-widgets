"use strict";

var React                = require('react');
var SupporterCardGiveNow = require('../SupporterCardGiveNow');
var Footprint            = require('../../footprint/Footprint');

module.exports = React.createClass({
  displayName: 'SupporterCard',

  render: function() {
    var props = this.props;
    var style = {
      width: props.width
    };

    return (
      <div className="SupporterCardWrapper" style={ style }>
        <div className="SupporterCard">
          <Footprint
            data={ props.data }
            compact={ true }
            size={ 120 }
            userImage={ props.image }
            userName={ props.name }
            userUrl={ props.url } />

          <a href={ props.url } className="SupporterCard__userName">{ props.name }</a>

          <SupporterCardGiveNow
            name={ props.name }
            target={ props.target }
            current={ props.current }
            i18n={{ currency: props.currency }} />
        </div>
      </div>
    );
  }
});
