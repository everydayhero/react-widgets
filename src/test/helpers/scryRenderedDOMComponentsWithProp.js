"use strict";

var ReactTestUtils = require('react/addons').addons.TestUtils;

function scryRenderedDOMComponentsWithProp(root, propName, propValue) {
  return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
    return ReactTestUtils.isDOMComponent(inst) &&
      inst.props.hasOwnProperty(propName) &&
      inst.props[propName] === propValue;
  });
}

function findRenderedDOMComponentWithProp(root, propName, propValue) {
  var all = scryRenderedDOMComponentsWithProp(
    root,
    propName,
    propValue
  );
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for ' + propName + ':' + propValue
    );
  }
  return all[0];
}

module.exports = {
  scryRenderedDOMComponentsWithProp: scryRenderedDOMComponentsWithProp,
  findRenderedDOMComponentWithProp: findRenderedDOMComponentWithProp
};
