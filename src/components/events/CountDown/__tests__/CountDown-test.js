'use strict';
jest.autoMockOff();

describe('Event', function() {
  var React       = require('react/addons');
  var CountDown   = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var element;
    var days = 100;
    var linkUrl = 'http://www.google.com/';

    beforeEach(function() {
      var countDown = <CountDown days={ days } linkUrl={ linkUrl } />;
      element = TestUtils.renderIntoDocument(countDown);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders days', function() {
      var node = findByClass(element, 'CountDown__days').getDOMNode();
      expect(node.textContent).toBe(days.toString());
    });

    it('renders days to go', function() {
      findByClass(element, 'CountDown__daysToGo');
    });

    it('renders anchor with register url', function() {
      var node = findByClass(element, 'CountDown__register').getDOMNode();
      expect(node.href).toBe(linkUrl);
    });

    it('renders anchor with default text', function() {
      var node = findByClass(element, 'CountDown__register').getDOMNode();
      expect(node.textContent).toBe('Get Started');
    });
  });

  describe('component configurable', function() {
    var element;
    var days = 100;
    var linkUrl = 'http://www.google.com/';

    beforeEach(function() {
      var countDown = <CountDown days={ days } i18n={{ linkText:'Register' }} linkUrl={ linkUrl } />;
      element = TestUtils.renderIntoDocument(countDown);
    });

    it('renders anchor with provided text', function() {
      var node = findByClass(element, 'CountDown__register').getDOMNode();
      expect(node.textContent).toBe('Register');
    });
  });
});
