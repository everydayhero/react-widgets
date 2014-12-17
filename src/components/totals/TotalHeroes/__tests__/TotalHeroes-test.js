"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TotalHeroes', function() {
  var React       = require('react/addons');
  var TotalHeroes = require('../');
  var pages       = require('../../../../api/pages');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var totalHeroes;
    var element;

    beforeEach(function() {
      pages.findByCampaign.mockClear();
      totalHeroes = <TotalHeroes campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(totalHeroes);
    });

    it('render something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total of pages', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe('Heroes');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalHeroes__icon');

      expect(icon).not.toBeNull();
    });

    it('shows a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'TotalHeroes__loading');
    });

    it('checks that find function works with default props', function() {
      expect(pages.findByCampaign.mock.calls.length).toEqual(2);

      expect(pages.findByCampaign).toBeCalledWith("us-22", 1, 1, 'user', element.onSuccess);
      expect(pages.findByCampaign).toBeCalledWith("us-24", 1, 1, 'user', element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalHeroes;
    var element;
    var translation = {
      title: 'blahblah'
    };

    beforeEach(function() {
      totalHeroes = <TotalHeroes i18n={ translation } />;
      element = TestUtils.renderIntoDocument(totalHeroes);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });
  });
});
