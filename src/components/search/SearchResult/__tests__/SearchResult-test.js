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

  it('links to given url if onSelect callback not given', function() {
    var callback = jest.genMockFunction();
    var url = 'http://blah.com/';
    var searchResult = <Result result={ result } url={ url } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');

    expect(element.getDOMNode().href).toBe(url);
  });

  it('calls onSelect callback on click if given', function() {
    var callback = jest.genMockFunction();
    var searchResult = <Result result={ result } onSelect={ callback } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');
    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(result);
  });
});
