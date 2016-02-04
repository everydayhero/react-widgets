'use strict';

var ReactTestUtils = require('react-addons-test-utils');

function scryRenderedDOMComponentsWithValue(root, value) {
  return ReactTestUtils.findAllInRenderedTree(root, function(elem) {
    return ReactTestUtils.isDOMComponent(elem) &&
      elem.value === value;
  });
}

function findRenderedDOMComponentWithValue(root, value) {
  var all = scryRenderedDOMComponentsWithValue(
    root,
    value
  );
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for value: ' + value
    );
  }
  return all[0];
}

module.exports = {
  scryRenderedDOMComponentsWithValue: scryRenderedDOMComponentsWithValue,
  findRenderedDOMComponentWithValue: findRenderedDOMComponentWithValue
};
