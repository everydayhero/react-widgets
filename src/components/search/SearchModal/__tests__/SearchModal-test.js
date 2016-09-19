jest.disableAutomock();

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchModal from '../';
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchModal', function() {
  it('renders a modal overlay', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var overlayElement = findByClass(element, 'Overlay');

    expect(overlayElement).toBeDefined();
  });

  it('has a header with input', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var headerElement = findByClass(element, 'SearchModal__header');
    var inputElement = findByClass(element, 'SearchInput');

    expect(headerElement).toBeDefined();
    expect(inputElement).toBeDefined();
  });

  it('has a body with search results', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var bodyElement = findByClass(element, 'SearchModal__body');
    var resultsElement = findByClass(element, 'SearchResults');

    expect(bodyElement).toBeDefined();
    expect(resultsElement).toBeDefined();
  });

  it('has pagination', function() {
    var searchModal = <SearchModal autoFocus={ false } pagination={{ totalPages: 2 }} />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var headerElement = findByClass(element, 'SearchModal__header');
    var paginationElement = findByClass(element, 'SearchPagination');
    var bodyElement = findByClass(element, 'SearchModal__body');

    expect(headerElement).toBeDefined();
    expect(paginationElement).toBeDefined();
    expect(bodyElement.getAttribute('class')).toContain('SearchModal__body--paginated');
  });
});
