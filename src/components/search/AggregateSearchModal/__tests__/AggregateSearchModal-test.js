"use strict";

jest.autoMockOff();

var React                = require('react/addons');
var TestUtils            = React.addons.TestUtils;
var AggregateSearchModal = require('../');
var findByClass          = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass          = TestUtils.scryRenderedDOMComponentsWithClass;
var searchModal;
var element;

describe('AggregateSearchModal', function() {
  beforeEach(function() {
    searchModal = <AggregateSearchModal autoFocus={ false } />;
    element     = TestUtils.renderIntoDocument(searchModal);
  });

  it('renders a modal overlay', function() {
    var overlayElement = findByClass(element, 'Overlay');
    expect(overlayElement).toBeDefined();
  });

  it('renders a loading state while fetching results', function() {
    element.setState({ isSearching: true, results: true });
    findByClass(element, 'AggregateSearchModal__footer--loading');
  });

  it('renders an empty state if no results can be found', function() {
    element.setState({ isSearching: false, results: {} });
    findByClass(element, 'AggregateSearchModal__footer--empty');
  });

  it('renders all filters by default', function() {
    element.setState({ results: { foo: 'bar' }, isSearching: false });
    expect(scryByClass(element, 'AggregateSearchModal__filters__type').length).toBe(3);
  });
});

describe('AggregateSearchModal with searchType prop set', function() {
  it('renders a single filter based on the `searchType` prop', function() {
    searchModal = <AggregateSearchModal autoFocus={ false } searchType="campaigns" />;
    element     = TestUtils.renderIntoDocument(searchModal);

    element.setState({ results: { foo: 'bar' }, isSearching: false });

    var filterElements = scryByClass(element, 'AggregateSearchModal__filters__type');

    expect(filterElements.length).toBe(1);
    expect(filterElements[0].getDOMNode().textContent).toContain('Events');
  });
});
