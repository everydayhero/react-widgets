jest.disableAutomock();
jest.mock('../../../../api/pages');

jest.useFakeTimers();

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
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);

    expect(element.find(SearchModal)).toBeDefined();
  });

  it('renders search results', function() {
    pages.search.mockImplementation(function(query, callback) {
      callback(response);
    });

    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    const resultElements = element.find('.SearchResult');
    expect(resultElements.length).toEqual(1);
    expect(resultElements.first().prop('href')).toBe(page.url);
    expect(resultElements.first().text()).toContain(page.name);
    expect(resultElements.first().text()).toContain(page.charity.name);
  });
});

describe('ID Handling', function() {
  beforeEach(function() {
    pages.search.mockClear();
  });

  it('Queries with a single Campaign UID', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    const query = { country: 'us', searchTerm: 'foo', campaignUid: 'us-22', charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    const pageSearchModal = (
      <PageSearchModal
        campaignUid="us-22"
        country="us"
        autoFocus={ false }
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    expect(pages.search.mock.calls.length).toEqual(1);
    expect(pages.search).lastCalledWith(query, element.instance().updateResults);
  })

  it('Queries with multiple Campaign UIDs', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    const query = { country: 'us', searchTerm: 'foo', campaignUid: ['us-22', 'us-24'], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    const pageSearchModal = (
      <PageSearchModal
        campaignUids={ ['us-22', 'us-24'] }
        country="us"
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    expect(pages.search.mock.calls.length).toEqual(1);
    expect(pages.search).lastCalledWith(query, element.instance().updateResults);
  })
});

describe('Searching', function() {
  beforeEach(function() {
    pages.search.mockClear();
  });

  it('searches for pages when provided with searchTerm prop', function() {
    const query = { country: 'us', searchTerm: 'bar', campaignUid: [], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    const pageSearchModal = (
      <PageSearchModal
        searchTerm={ 'bar' }
        autoFocus={ false }
        action="visit"
        country="us"
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    expect(input.prop('value')).toEqual(query.searchTerm);
    expect(pages.search).lastCalledWith(query, element.instance().updateResults);
  });

  it('searches for pages on input change', function() {
    const query = { country: 'us', searchTerm: 'foo', campaignUid: [], charityUid: '', page: 1, pageSize: 10, pageType: 'all', groupValue: [] };
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        action="visit"
        country="us"
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    expect(pages.search).lastCalledWith(query, element.instance().updateResults);
  });

  it('searches for more pages on page change', function() {
    pages.search.mockImplementation(function(query, callback) { callback(response); });

    const query = { country: 'us', searchTerm: 'foo', campaignUid: [], charityUid: '', page: 2, pageSize: 10, pageType: 'all', groupValue: [] };
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        action="visit"
        country="us"
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    var nextPageButton = element.find('.SearchPagination__button--right');
    nextPageButton.simulate('click');

    expect(pages.search.mock.calls.length).toEqual(2);
    expect(pages.search).lastCalledWith(query, element.instance().updateResults);
  });

  it('updates isSearching accordingly', function() {
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        action="visit"
        country="us"
        onClose={ () => {} } />
    );
    const element = mount(pageSearchModal);
    const input = element.find('input');

    expect(element.state('isSearching')).toBeFalsy();

    input.simulate('change', { target: { value: 'foo' }});
    jest.runAllTimers();

    expect(element.state('isSearching')).toBeTruthy();

    var searchCallback = pages.search.mock.calls[0][1];
    searchCallback(response);

    expect(element.state('isSearching')).toBeFalsy();
  });

  it('allows custom callback on page select', function() {
    const onClose = jest.genMockFunction();
    const callback = jest.genMockFunction();
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        onClose={ onClose }
        action="custom"
        onSelect={ callback } />
    );
    const element = mount(pageSearchModal);
    element.setState({ results: [page] });

    const resultElements = element.find('.SearchResult');
    resultElements.first().simulate('click');

    expect(callback).lastCalledWith(page);
  });

  it('calls onClose on page select', function() {
    const onClose = jest.genMockFunction();
    const callback = jest.genMockFunction();
    const pageSearchModal = (
      <PageSearchModal
        autoFocus={ false }
        onClose={ onClose }
        onSelect={ callback } />
    );
    const element = mount(pageSearchModal);
    element.setState({ results: [page] });

    const resultElements = element.find('.SearchResult');
    resultElements.first().simulate('click');

    expect(onClose).toBeCalled();
  });
});
