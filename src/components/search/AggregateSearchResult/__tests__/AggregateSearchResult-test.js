'use strict';

jest.autoMockOff();

var React       = require('react/addons');
var Result      = require('../');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('AggregateSearchResult', function() {
  var result = { id: '123', name: 'Enraged Potato' };
  var url    = 'http://potato.com/';

  it('renders result with content', function() {
    var searchResult = <Result url={ url } result={ result }>foo</Result>;
    var component = TestUtils.renderIntoDocument(searchResult);
    var element = findByClass(component, 'AggregateSearchResult');

    expect(element.getDOMNode().textContent).toBe('foo');
  });

  it('links to given url if onSelect callback not given', function() {
    var searchResult = <Result result={ result } url={ url } />;
    var component    = TestUtils.renderIntoDocument(searchResult);
    var element      = findByClass(component, 'AggregateSearchResult');

    expect(element.getDOMNode().href).toBe(url);
  });

  it('calls onSelect on click if given', function() {
    var callback     = jest.genMockFunction();
    var searchResult = <Result result={ result } onSelect={ callback } />;
    var component    = TestUtils.renderIntoDocument(searchResult);
    var element      = findByClass(component, 'AggregateSearchResult');

    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(result);
  });
});
