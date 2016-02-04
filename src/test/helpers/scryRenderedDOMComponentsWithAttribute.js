'use strict';

var ReactTestUtils = require('react-addons-test-utils');

function scryRenderedDOMComponentsWithAttribute(root, attribute, value) {
  return ReactTestUtils.findAllInRenderedTree(root, function(elem) {
    return ReactTestUtils.isDOMComponent(elem) &&
      elem.getAttribute(attribute) === value;
  });
}

function findRenderedDOMComponentWithAttribute(root, attribute, value) {
  var all = scryRenderedDOMComponentsWithAttribute(
    root,
    attribute,
    value
  );
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for ' + attribute + ': ' + value
    );
  }
  return all[0];
}

module.exports = {
  scryRenderedDOMComponentsWithAttribute: scryRenderedDOMComponentsWithAttribute,
  findRenderedDOMComponentWithAttribute: findRenderedDOMComponentWithAttribute
};
