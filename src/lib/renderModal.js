"use strict";

var React = require('react');

function renderModal(component, options) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  options.onClose = function() {
    React.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };

  React.render(React.createFactory(component)(options), div);
}

module.exports = renderModal;
