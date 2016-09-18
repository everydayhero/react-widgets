jest.disableAutomock();
import sinon from 'sinon';
import React from 'react';
import SearchResults from '../';
import TestUtils from 'react-addons-test-utils';
var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass   = TestUtils.scryRenderedDOMComponentsWithClass;

describe('SearchResults', function() {
  var results = [{ id: 1 }, { id: 2 }];

  it('renders all the results', function() {
    var searchResults = <SearchResults results={ results }/>;
    var element = TestUtils.renderIntoDocument(searchResults);
    var resultsElement = findByClass(element, 'SearchResults');
    var resultElements = scryByClass(element, 'SearchResult');

    expect(resultsElement).toBeDefined();
    expect(resultElements.length).toBe(results.length);
  });

  it('uses renderComponent to render each result', function() {
    var component = sinon.spy(() => <p/>);
    var searchResults = <SearchResults results={ results } resultComponent={ component }/>;
    TestUtils.renderIntoDocument(searchResults);

    expect(component.calledTwice).toBe(true);
  });

  it('shows "no results" when empty', function() {
    var searchResults = <SearchResults results={ [] }/>;
    var element = TestUtils.renderIntoDocument(searchResults);
    var noResultsElement = findByClass(element, 'SearchResults--empty');

    expect(noResultsElement.textContent).toBe('No results');
  });

  it('does not show "no results" when null', function() {
    var searchResults = <SearchResults results={ null }/>;
    var element = TestUtils.renderIntoDocument(searchResults);
    var noResultsElements = scryByClass(element, 'SearchResults--empty');

    expect(noResultsElements.length).toBe(0);
  });
});
