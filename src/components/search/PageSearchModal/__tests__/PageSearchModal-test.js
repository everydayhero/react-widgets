/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

jest.mock('../../../../api/pages');
var pages = require('../../../../api/pages');

var _ = require('lodash');
_.debounce = function(callback) { return callback; }

var React              = require('react/addons');
var TestUtils          = React.addons.TestUtils;
var PageSearchModal    = require('../');
var SearchModal        = require('../../SearchModal');
var findByClass        = TestUtils.findRenderedDOMComponentWithClass;
var findByType         = TestUtils.findRenderedComponentWithType;
var scryByClass        = TestUtils.scryRenderedDOMComponentsWithClass;
var findByTag          = TestUtils.findRenderedDOMComponentWithTag

var page = {
  id: 12,
  uid: 'au-12',
  slug: 'foo',
  name: 'Foo',
  country_code: 'au',
  campaign: {
    uid: 'au-7',
    name: 'Baz'
  },
  charity: {
    uid: 'au-42',
    name: 'Bar'
  },
  image: {
    small_image_url: 'http://blah.com/avatar.png'
  },
  url: 'http://page.url'
};

var response = {
  pages: [page],
  meta: {
    pagination: {
      count: 1,
      current_page: 1,
      total_pages: 2
    }
  }
};

describe('PageSearchModal', function() {
  beforeEach(function() {
    pages.search.mockClear();
  });

  it('renders a SearchModal', function() {
    var pageSearchModal = <PageSearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var searchModal = findByType(element, SearchModal);

    expect(searchModal).toBeDefined();
  });

  it('renders search results', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    var pageSearchModal = <PageSearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    var resultElements = scryByClass(element, 'SearchResult');
    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].getDOMNode().textContent).toContain(page.name);
    expect(resultElements[0].getDOMNode().textContent).toContain(page.charity.name);
  });

  it('searches for pages on input change', function() {
    var query = { country: 'xy', searchTerm: 'foo', campaignUid: '', page: 1, pageSize: 10 };
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(pages.search).lastCalledWith(query, jasmine.any(Function));
  });

  it('searches for more pages on page change', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    var query = { country: 'xy', searchTerm: 'foo', campaignUid: '', page: 2, pageSize: 10 };
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    var nextPageButton = findByClass(element, 'SearchPagination__button--right');
    TestUtils.Simulate.click(nextPageButton);

    expect(pages.search.mock.calls.length).toEqual(2);
    expect(pages.search).lastCalledWith(query, jasmine.any(Function));
  });

  it('updates isSearching accordingly', function() {
    var query = { country: 'xy', searchTerm: 'foo', campaignUid: '', page: 1, pageSize: 10 };
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');

    expect(element.state.isSearching).toBeFalsy();

    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(element.state.isSearching).toBeTruthy();

    var searchCallback = pages.search.mock.calls[0][1];
    searchCallback(response);

    expect(element.state.isSearching).toBeFalsy();
  });

  it('redirects to page url on page select', function() {
    var onClose = jest.genMockFunction();
    var pageSearchModal = <PageSearchModal autoFocus={ false } onClose={ onClose } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    element.setState({ results: [page] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(document.location).toEqual(page.url);
  });

  it('allows custom callback on page select', function() {
    var onClose = jest.genMockFunction();
    var callback = jest.genMockFunction();
    var pageSearchModal = <PageSearchModal autoFocus={ false } onClose={ onClose } onSelect={ callback } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    element.setState({ results: [page] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(callback).lastCalledWith(page);
  });

  it('calls onClose on result select', function() {
    var onClose = jest.genMockFunction();
    var callback = jest.genMockFunction();
    var pageSearchModal = <PageSearchModal autoFocus={ false } onClose={ onClose } onSelect={ callback } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    element.setState({ results: [page] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(onClose).toBeCalled();
  });
});
