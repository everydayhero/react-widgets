'use strict';

jest.autoMockOff();

var React                = require('react');
var TestUtils            = require('react-addons-test-utils');
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

  it('selects a filter when a filter selection button is clicked', function() {
    element.setState({ results: { foo: 'bar' }, isSearching: false });
    var filterElements = scryByClass(element, 'AggregateSearchModal__filters__type');
    expect(element.state.filter).toEqual('all');
    TestUtils.Simulate.click(filterElements[1]);
    expect(element.state.filter).toEqual('charities');
    TestUtils.Simulate.click(filterElements[0]);
    expect(element.state.filter).toEqual('pages');
  });
});

describe('results', function() {
  var searchModal;
  var element;
  var onSelect = jest.genMockFunction();

  beforeEach(function() {
    searchModal = <AggregateSearchModal autoFocus={ false } onSelect={ onSelect } onClose={ function () {} } />;
    element     = TestUtils.renderIntoDocument(searchModal);
  });

  it('renders selectable results', function() {
    element.setState({
      results: [
        {
          _type: 'page',
          name: 'Foo',
          supporter: {},
          image: {},
          campaign: { uid: 'au-123' },
          charity: {}
        }
      ]
    });
    var result = findByClass(element, 'AggregateSearchResult');
    TestUtils.Simulate.click(result);
    expect(onSelect.mock.calls.length).toBe(1)
  });
});

describe('AggregateSearchModal with searchType prop set', function() {
  var filterElements;

  beforeEach(function() {
    searchModal = <AggregateSearchModal autoFocus={ false } searchType="campaigns" />;
    element = TestUtils.renderIntoDocument(searchModal);
    element.setState({ results: { foo: 'bar' }, isSearching: false });
    filterElements = scryByClass(element, 'AggregateSearchModal__filters__type');
  });

  it('renders a single filter based on the `searchType` prop', function() {
    expect(filterElements.length).toBe(1);
    expect(filterElements[0].textContent).toContain('Events');
  });

  it('the filter selection button is disabled (has no onclick behaviour)', function() {
    expect(element.state.filter).toEqual('campaigns');
    TestUtils.Simulate.click(filterElements[0]);
    expect(element.state.filter).toEqual('campaigns');
  });
});

describe('AggregateSearchModal with custom onSelect function prop', function() {
  it('will call the provided custom function and close the modal', function() {
    var mockSelect = jest.genMockFunction();
    var mockClose = jest.genMockFunction();
    searchModal = <AggregateSearchModal autoFocus={ false } onSelect={ mockSelect } onClose={ mockClose } />;
    var component = TestUtils.renderIntoDocument(searchModal);

    component.handleSelect();

    expect(mockSelect.mock.calls.length).toBe(1);
    expect(mockClose.mock.calls.length).toBe(1);
  });
});
