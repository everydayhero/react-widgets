/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React                     = require('react/addons');
var SearchResults             = require('../../Results');
var TestUtils                 = React.addons.TestUtils;
var srcyByClass               = TestUtils.scryRenderedDOMComponentsWithClass;

describe('it renders the results', function() {
  var results = [{title: 'title text', description: 'description text'}];

  it('renders all the results', function() {
    var searchResults = <SearchResults results={results}/>;
    var element = TestUtils.renderIntoDocument(searchResults);
    var resultElements = srcyByClass(element, 'Result');
    expect(resultElements.length).toBe(results.length);
  });
});
