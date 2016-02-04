"use strict";
jest.autoMockOff();

var React       = require('react');
var Result      = require('../');
var TestUtils   = require('react-addons-test-utils');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchResult', function() {
  var result = { id: '1', url: 'http://blah.com/' };

  it('renders a result', function() {
    var searchResult = <Result result={ result }>foo</Result>;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');

    expect(element.textContent).toBe('foo');
  });

  it('links to given url if onSelect callback not given', function() {
    var callback = jest.genMockFunction();
    var searchResult = <Result result={ result } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'SearchResult');

    expect(element.href).toBe(result.url);
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
