jest.disableAutomock();
jest.mock('../../../../api/charities');

import charities from '../../../../api/charities';
const donateUrl = 'http://donate.url/';
const fundraiseUrl = 'http://fundraise.url/';
charities.donateUrl.mockReturnValue(donateUrl);
charities.fundraiseUrl.mockReturnValue(fundraiseUrl);

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CharitySearchModal from '../';
import SearchModal from '../../SearchModal';
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const findByType = TestUtils.findRenderedComponentWithType;
const scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
const findByTag = TestUtils.findRenderedDOMComponentWithTag;

describe('CharitySearchModal', function() {
  const charity = {
    uid: 'xy-12',
    slug: 'foo',
    name: 'Foo',
    description: 'Fooy',
    country_code: 'xy',
    url: 'http://foo.com/'
  };

  const charity2 = {
    uid: 'xy-42',
    slug: 'bar',
    name: 'Bar',
    description: 'Bary',
    country_code: 'xy',
    url: 'http://bar.com/'
  };

  const searchResponse = {
    charities: [charity],
    meta: {
      pagination: {
        count: 1,
        current_page: 1,
        total_pages: 2
      }
    }
  };

var findByUidsResponse = {
  charities: [charity2]
};

describe('CharitySearchModal', function() {
  beforeEach(function() {
    charities.search.mockClear();
    charities.findByUids.mockClear();
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

  it('search for all charities when search is empty', function() {
    var query = { country: 'xy', searchTerm: '', campaignUid: '', page: 1, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy"/>;
    var element = TestUtils.renderIntoDocument(charitySearchModal);

    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for charities within campaign', function() {
    var query = { country: 'xy', searchTerm: '', campaignUid: 'xy-123', page: 1, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" campaignUid="xy-123" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);

    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for charities on input change', function() {
    var query = { country: 'xy', searchTerm: 'foo', campaignUid: '', page: 1, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(charities.search.mock.calls.length).toEqual(2);
    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('searches for more charities on page change', function() {
    charities.search.mockImplementation(function(query, callback) { callback(searchResponse); });

    var query = { country: 'xy', searchTerm: '', campaignUid: '', page: 2, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } country="xy" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var nextPageButton = findByClass(element, 'SearchPagination__button--right');
    TestUtils.Simulate.click(nextPageButton);

    expect(charities.search.mock.calls.length).toEqual(2);
    expect(charities.search).lastCalledWith(query, element.updateResults);
  });

  it('uses default "give" campaign uid when action is "fundraise"', function() {
    var query = { country: 'au', searchTerm: '', campaignUid: 'au-0', page: 1, pageSize: 10 };
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="fundraise" country="au" />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);

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

  it('links to fundraise url for fundraise action', function() {
    var onClose = jest.genMockFunction();
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="fundraise" onClose={ onClose } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    element.setState({ results: [charity] });

    var resultElements = scryByClass(element, 'SearchResult');

    expect(charities.fundraiseUrl).lastCalledWith(charity, null);
    expect(resultElements[0].href).toBe(fundraiseUrl);
  });

  it('links to donate url for donate action', function() {
    var onClose = jest.genMockFunction();
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="donate" onClose={ onClose } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    element.setState({ results: [charity] });

    var resultElements = scryByClass(element, 'SearchResult');

    expect(charities.donateUrl).lastCalledWith(charity, null);
    expect(resultElements[0].href).toBe(donateUrl);
  });

  it('calls custom onSelect callback on charity select', function() {
    var onClose = jest.genMockFunction();
    var callback = jest.genMockFunction();
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="custom" onClose={ onClose } onSelect={ callback } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    element.setState({ results: [charity] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(callback).lastCalledWith(charity);
  });

  it('calls onClose on charity select when onSelect callback given', function() {
    var onClose = jest.genMockFunction();
    var callback = jest.genMockFunction();
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="custom" onClose={ onClose } onSelect={ callback } />;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    element.setState({ results: [charity] });

    var resultElements = scryByClass(element, 'SearchResult');
    TestUtils.Simulate.click(resultElements[0]);

    expect(onClose).toBeCalled();
  });

  it('loads promoted charities when provided', function() {
    var charityUids = ['xy-123', 'xy-456'];
    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="donate" country="xy" promotedCharityUids={ charityUids }/>;
    var element = TestUtils.renderIntoDocument(charitySearchModal);

    expect(charities.findByUids).lastCalledWith(charityUids, element.updatePromotedCharities);
  });

  it('shows promoted charities when search is empty', function() {
    charities.findByUids.mockImplementation(function(charityUids, callback) { callback(findByUidsResponse); });

    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="donate" country="xy" promotedCharityUids={ ['xy-42'] }/>;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var resultElements = scryByClass(element, 'SearchResult');

    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].textContent).toContain(charity2.name);
    expect(resultElements[0].textContent).toContain(charity2.description);
  });

  it('not show promoted charities when search is not empty', function() {
    charities.findByUids.mockImplementation(function(charityUids, callback) { callback(findByUidsResponse); });
    charities.search.mockImplementation(function(query, callback) { callback(searchResponse); });

    var charitySearchModal = <CharitySearchModal autoFocus={ false } action="donate" country="xy" promotedCharityUids={ ['xy-42'] }/>;
    var element = TestUtils.renderIntoDocument(charitySearchModal);
    var resultElements = scryByClass(element, 'SearchResult');

    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].textContent).toContain(charity2.name);

    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });
    resultElements = scryByClass(element, 'SearchResult');

    expect(resultElements.length).toEqual(1);
    expect(resultElements[0].textContent).toContain(charity.name);
  });
});
