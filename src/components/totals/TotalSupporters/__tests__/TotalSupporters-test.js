"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TotalSupporters', function() {
  var React       = require('react');
  var TotalSupporters = require('../');
  var pages       = require('../../../../api/pages');
  var TestUtils   = require('react-addons-test-utils');
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('render something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total of pages', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalSupporters__total');

      expect(total.textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalSupporters__title');

      expect(title.textContent).toBe('Supporters');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalSupporters__icon');

      expect(icon).not.toBeNull();
    });

    it('shows a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalSupporters__loading');
    });

    it('makes a single call using to fetch api data', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: ["us-22"],
        charityUid: [],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('Working with multiple campaign uids', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('makes a single call to fetch api data', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: ["us-22", "us-24"],
        charityUid: [],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('single charity id', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters charityUid="au-24" />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('handles a single charity id', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ["au-24"],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('Working with multiple charity uids', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters charityUids={ ["au-24", "au-31"] } />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('makes a single call to fetch api data', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ["au-24", "au-31"],
        groupValue: [],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('Working with a single group value', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters charityUids={ ["au-24", "au-31"] } groupValue={ "ABC" } />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('makes a single call to fetch data with a single group value', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ["au-24", "au-31"],
        groupValue: ["ABC"],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('Working with a multiple group values', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters charityUids={ ["au-24", "au-31"] } groupValues={ ["ABC", "DEF"] } />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('makes a single call to fetch data with multiple group values', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ["au-24", "au-31"],
        groupValue: ["ABC", "DEF"],
        pageSize: 1,
        page: 1,
        searchTerm: ""
      }, element.onSuccess);
    });
  });

  describe('Custom component props', function() {
    var totalSupporters;
    var element;
    var translation = {
      title: 'blahblah'
    };

    beforeEach(function() {
      totalSupporters = <TotalSupporters i18n={ translation } />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalSupporters__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalSupporters__total');

      expect(total.textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a standard format by default', function() {
      var totalSupporters = <TotalSupporters campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalSupporters);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalSupporters__total');
      expect(total.textContent).toBe('10,050');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalSupporters = <TotalSupporters campaignUid="au-0" format="0.00" />;
      var element = TestUtils.renderIntoDocument(totalSupporters);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalSupporters__total');
      expect(total.textContent).toBe('10050.00');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var totalSupporters = <TotalSupporters campaignUid="au-0" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(totalSupporters);
      var icon = scryByClass(element, 'TotalSupporters__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var totalSupporters = <TotalSupporters campaignUid="au-0" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(totalSupporters);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });

  describe('Filtering by page type', function() {
    var totalSupporters;
    var element;

    beforeEach(function() {
      pages.search.mockClear();
      totalSupporters = <TotalSupporters charityUids={ ["au-24", "au-31"] } type="team" />;
      element = TestUtils.renderIntoDocument(totalSupporters);
    });

    it('requests pages only of type "team"', function() {
      expect(pages.search.mock.calls.length).toEqual(1);
      expect(pages.search).toBeCalledWith({
        campaignUid: [],
        charityUid: ["au-24", "au-31"],
        groupValue: [],
        pageSize: 1,
        page: 1,
        pageType: "team",
        searchTerm: ""
      }, element.onSuccess);
    });
  });
});
