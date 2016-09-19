jest.disableAutomock();
jest.mock('../../../../api/frolCharities');

import charities from '../../../../api/frolCharities';

var charity = {
  uid: 'xy-12',
  slug: 'foo',
  name: 'Foo',
  description: 'Fooy',
  country_code: 'xy',
  url: 'http://foo.com/'
};

var searchResponse = {
  charities: [charity],
  meta: {
    pagination: {
      count: 1,
      current_page: 1,
      total_pages: 2
    }
  }
};

charities.search.mockReturnValue(searchResponse);

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CharitySearchModal from '../';
import SearchModal from '../../SearchModal';
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const findByType = TestUtils.findRenderedComponentWithType;
const scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
const findByTag = TestUtils.findRenderedDOMComponentWithTag;

describe('CharitySearchModal', function() {
  beforeEach(function() {
    charities.search.mockClear();
  });

  it('renders a SearchModal', function() {
    var charitySearchModal = <CharitySearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var searchModal = findByType(element, SearchModal);

    expect(searchModal).toBeDefined();
  });

  it('renders search results', function() {
    charities.search.mockImplementation(function(query, callback) { callback(searchResponse); });

    var charitySearchModal = <CharitySearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var resultElements = scryByClass(element, 'SearchResult');

    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].textContent).toContain(charity.name);
    expect(resultElements[0].textContent).toContain(charity.description);
  });

  it('searches for charities on input change', function() {
    var query = { searchTerm: 'foo', page: 1, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(charities.search.mock.calls.length).toEqual(2);
    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for more charities on page change', function() {
    charities.search.mockImplementation(function(query, callback) { callback(searchResponse); });

    var query = { searchTerm: '', page: 2, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var nextPageButton = findByClass(element, 'SearchPagination__button--right');
    TestUtils.Simulate.click(nextPageButton);

    expect(charities.search.mock.calls.length).toEqual(2);
    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('updates isSearching accordingly', function() {
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);

    expect(element.state.isSearching).toBeTruthy();

    var searchCallback = charities.search.mock.calls[0][1];
    searchCallback(searchResponse);

    expect(element.state.isSearching).toBeFalsy();

    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(element.state.isSearching).toBeTruthy();
  });

  it('links to charity url for default visit action', function() {
    var onClose = jest.genMockFunction();
    var charitySearchModal = <CharitySearchModal autoFocus={ false } onClose={ onClose } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    element.setState({ results: [charity] });

    var resultElements = scryByClass(element, 'SearchResult');

    expect(resultElements[0].href).toBe(charity.url);
  });
});
