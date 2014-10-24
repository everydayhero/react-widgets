/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var Result      = require('../');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchResult', function() {
  it('renders a result', function() {
    var result = { id: '1' };
    var searchResult = <Result result={ result }>foo</Result>;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');

    expect(element.getDOMNode().textContent).toBe('foo');
  });
});
