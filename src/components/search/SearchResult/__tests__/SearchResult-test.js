"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var Result      = require('../');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchResult', function() {
  var result = { id: '1' };

  it('renders a result', function() {
    var searchResult = <Result result={ result }>foo</Result>;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');

    expect(element.getDOMNode().textContent).toBe('foo');
  });

  it('calls onSelect on click', function() {
    var callback = jest.genMockFunction();
    var searchResult = <Result result={ result } onSelect={ callback } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');
    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(result);
  });
});
