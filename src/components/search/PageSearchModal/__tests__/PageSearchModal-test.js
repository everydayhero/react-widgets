jest.disableAutomock();
jest.mock('../../../../api/pages');

import pages from '../../../../api/pages';
import React from 'react';
import { mount } from 'enzyme';
import PageSearchModal from '../';
import SearchModal from '../../SearchModal';

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
    medium_image_url: 'http://blah.com/avatar.png'
  },
  url: 'http://page.url/',
  supporter: {
    name: 'Supporter Name'
  }
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

describe('Rendering', function() {
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
    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    var resultElements = scryByClass(element, 'SearchResult');
    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].href).toBe(page.url);
    expect(resultElements[0].textContent).toContain(page.name);
    expect(resultElements[0].textContent).toContain(page.charity.name);
  });
});

describe('ID Handling', function() {
  beforeEach(function() {
    pages.search.mockClear();
  });

  it('Queries with a single Campaign UID', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    var query = { country: 'xy', searchTerm: 'foo', campaignUid: 'us-22', charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    var pageSearchModal = <PageSearchModal campaignUid="us-22" country="xy"/>;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    expect(pages.search.mock.calls.length).toEqual(1);
    expect(pages.search).lastCalledWith(query, element.updateResults);
  })

  it('Queries with multiple Campaign UIDs', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    var query = { country: 'xy', searchTerm: 'foo', campaignUid: ['us-22', 'us-24'], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    var pageSearchModal = <PageSearchModal campaignUids={ ['us-22', 'us-24'] } country="xy"/>;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    expect(pages.search.mock.calls.length).toEqual(1);
    expect(pages.search).lastCalledWith(query, element.updateResults);
  })
});

describe('Searching', function() {
  beforeEach(function() {
    pages.search.mockClear();
  });

  it('searches for pages when provided with searchTerm prop', function() {
    var query = { country: 'xy', searchTerm: 'bar', campaignUid: [], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    var pageSearchModal = <PageSearchModal searchTerm={ 'bar' } autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');

    expect(input.value).toEqual(query.searchTerm);
    expect(pages.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for pages on input change', function() {
    var query = { country: 'xy', searchTerm: 'foo', campaignUid: [], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    expect(pages.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for more pages on page change', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    var query = { country: 'xy', searchTerm: 'foo', campaignUid: [], charityUid: '', page: 2, pageSize: 10, pageType: 'all', groupValue: [] };
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    var nextPageButton = findByClass(element, 'SearchPagination__button--right');
    TestUtils.Simulate.click(nextPageButton);

    expect(pages.search.mock.calls.length).toEqual(2);
    expect(pages.search).lastCalledWith(query, element.updateResults);
  });

  it('updates isSearching accordingly', function() {
    var pageSearchModal = <PageSearchModal autoFocus={ false } action="donate" country="xy" />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    var input = findByTag(element, 'input');

    expect(element.state.isSearching).toBeFalsy();

    TestUtils.Simulate.change(input, { target: { value: 'foo' }});

    expect(element.state.isSearching).toBeTruthy();

    var searchCallback = pages.search.mock.calls[0][1];
    searchCallback(response);

    expect(element.state.isSearching).toBeFalsy();
  });

  it('allows custom callback on page select', function() {
    var onClose = jest.genMockFunction();
    var callback = jest.genMockFunction();
    var pageSearchModal = <PageSearchModal autoFocus={ false } onClose={ onClose } action="custom" onSelect={ callback } />;
    var element = TestUtils.renderIntoDocument(pageSearchModal);
    element.setState({ results: [page] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(callback).lastCalledWith(page);
  });

  it('calls onClose on page select', function() {
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
