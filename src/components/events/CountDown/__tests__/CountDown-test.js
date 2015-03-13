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
    var registerUrl = 'http://www.google.com/';

    beforeEach(function() {
      var countDown = <CountDown days={ days } registerUrl={ registerUrl } />;
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
      expect(node.href).toBe(registerUrl);
    });
  });
});
