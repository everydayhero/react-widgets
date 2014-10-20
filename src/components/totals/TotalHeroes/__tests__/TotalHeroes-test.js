/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('TotalHeroes', function() {
  var React                       = require('react/addons');
  var TotalHeroes                 = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
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

      expect(icon).not.toBeNull;
    });

    it('shows a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'TotalHeroes__loading');
    });

    it('check that a campaign id is present', function() {
      expect(pages.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalHeroes;
    var element;
    var translation = {
      title: 'blahblah'
    }

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
});
