"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

function renderModal(component, options) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  options.onClose = function() {
    React.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };

  ReactDOM.render(React.createFactory(component)(options), div);
}

module.exports = renderModal;
