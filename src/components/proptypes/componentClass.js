"use strict";

var React = require('react');

function createComponentClassChecker() {
  function checkType(isRequired, props, propName, componentName) {
    if (!props[propName]) {
      if (!isRequired) {
        return;
      }
      return new Error('Required prop `' + propName + '` was not specified in `' + componentName + '`.');
    }
    if (!React.isValidClass(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, expected React Component class.');
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

module.exports = createComponentClassChecker();
