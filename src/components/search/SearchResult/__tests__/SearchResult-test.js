/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React     = require('react/addons');
var Result    = require('../');
var TestUtils = React.addons.TestUtils;
var findByTag = TestUtils.findRenderedDOMComponentWithTag;

describe('it renders a result', function() {
  var results = [{title: 'title text', description: 'description text'}];

  it('renders a results', function() {
    var result = {
      id: '1',
      name: 'foo'
    }
    var searchResults = <Result result={ result }/>;
    var component = TestUtils.renderIntoDocument(searchResults);
    var element = findByTag(component, 'span');
    expect(element.getDOMNode().textContent).toBe('foo');
  });
});
