"use strict";
jest.autoMockOff();

describe('Goal', function() {
  var React       = require('react/addons');
  var Goal        = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
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

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'Goal__icon');
      expect(icon).not.toBeNull();
    });
  });

  describe('Custom component props', function() {
    var goal;
    var element;
    var translation = {
      title: 'asdjasj',
      symbol: '£',
      suffix: ' hours'
    };

    beforeEach(function() {
      goal = <Goal goal="5000000" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(goal);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'Goal__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('check for a total with custom symbol and suffix', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'Goal__total');

      expect(total.getDOMNode().textContent).toBe('£50 k hours');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a short format by default', function() {
      var goal = <Goal goal="5000000" />;
      var element = TestUtils.renderIntoDocument(goal);
      var total = findByClass(element, 'Goal__total');

      expect(total.getDOMNode().textContent).toBe('$50 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var goal = <Goal goal="5000000" format="0,0.00" />;
      var element = TestUtils.renderIntoDocument(goal);
      var total = findByClass(element, 'Goal__total');

      expect(total.getDOMNode().textContent).toBe('$50,000.00');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var goal = <Goal goal="5000000" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(goal);
      var icon = scryByClass(element, 'Goal__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var goal = <Goal goal="5000000" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(goal);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });

});
