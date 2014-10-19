/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

describe('Goal', function() {
  var React                       = require('react/addons');
  var Goal                        = require('../');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var goal;
    var element;

    beforeEach(function() {
      goal = <Goal />;
      element = TestUtils.renderIntoDocument(goal);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'Goal__total');

      expect(total.getDOMNode().textContent).toContain('$0');
    });

    it('renders a default title', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'Goal__title');

      expect(title.getDOMNode().textContent).toBe('Goal');
    });
  });

  describe('component props', function() {
    var goal;
    var element;
    var translation = {
      title: 'asdjasj',
      symbol: '£',
      goal: '50000'
    }

    beforeEach(function() {
      goal = <Goal i18n={ translation } />;
      element = TestUtils.renderIntoDocument(goal);
    });

    it('renders a custom title', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'Goal__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('check for a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'Goal__total');

      expect(total.getDOMNode().textContent).toContain('£50 k');
    });
  });
});
