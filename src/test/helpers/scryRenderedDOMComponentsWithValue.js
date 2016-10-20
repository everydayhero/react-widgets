import ReactTestUtils from 'react-addons-test-utils'

export function scryRenderedDOMComponentsWithValue (root, value) {
  return ReactTestUtils.findAllInRenderedTree(root, function (elem) {
    return ReactTestUtils.isDOMComponent(elem) &&
      elem.value === value
  })
}

export function findRenderedDOMComponentWithValue (root, value) {
  var all = scryRenderedDOMComponentsWithValue(
    root,
    value
  )
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for value: ' + value
    )
  }
  return all[0]
}

export default {
  scryRenderedDOMComponentsWithValue,
  findRenderedDOMComponentWithValue
}
