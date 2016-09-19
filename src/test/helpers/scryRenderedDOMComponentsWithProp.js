import ReactTestUtils from 'react-addons-test-utils';

export function scryRenderedDOMComponentsWithProp(root, propName, propValue) {
  return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
    return ReactTestUtils.isDOMComponent(inst) &&
      inst.props.hasOwnProperty(propName) &&
      inst.props[propName] === propValue;
  });
}

export function findRenderedDOMComponentWithProp(root, propName, propValue) {
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

export default {
  scryRenderedDOMComponentsWithProp,
  findRenderedDOMComponentWithProp
};
