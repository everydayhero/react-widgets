"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TotalHeroes', function() {
  var React       = require('react/addons');
  var TotalHeroes = require('../');
  var pages       = require('../../../../api/pages');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('Component defaults', function() {
    var totalHeroes;
    var element;

    beforeEach(function() {
      totalHeroes = <TotalHeroes campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(totalHeroes);
    });

    it('render something', function() {
      expect(element).not.toBeNull();
    });

    it('renders default total of pages', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });

    it('renders a default title', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe('Heroes');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'TotalHeroes__icon');

      expect(icon).not.toBeNull();
    });

    it('shows a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'TotalHeroes__loading');
    });

    it('checks that find function works with default props', function() {
      expect(pages.findByCampaign).toBeCalledWith('au-0', '1', '1', 'user', element.onSuccess);
    });
  });

  describe('Custom component props', function() {
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
      element.setState({isLoading: false});
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('renders a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a standard format by default', function() {
      var totalHeroes = <TotalHeroes campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(totalHeroes);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalHeroes__total');
      expect(total.getDOMNode().textContent).toBe('10,050');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var totalHeroes = <TotalHeroes campaignUid="au-0" unit="km" format="0.00" />;
      var element = TestUtils.renderIntoDocument(totalHeroes);

      element.setState({
        isLoading: false,
        total: 10050
      });

      var total = findByClass(element, 'TotalHeroes__total');
      expect(total.getDOMNode().textContent).toBe('10050.00');
    });
  });
});
