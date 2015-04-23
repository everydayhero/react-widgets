'use strict';

jest.autoMockOff();

describe('CountDown', function() {
  var React       = require('react/addons');
  var moment      = require('moment');
  var CountDown   = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var component;
    var date = '2016-04-24';

    beforeEach(function() {
      var countDown = <CountDown date={ date } />;
      component = TestUtils.renderIntoDocument(countDown);
    });

    it('renders something', function() {
      expect(component).not.toBeNull();
    });

    it('renders days', function() {
      var element = findByClass(component, 'CountDown__days').getDOMNode();
      expect(element).toBeDefined();
    });
  });

  describe('component configurable', function() {
    var component;
    var date = '2016-04-24';
    var linkUrl = 'http://www.google.com/';

    beforeEach(function() {
      var countDown = <CountDown date={ date } i18n={{ link_text: 'get foobarred' }} linkUrl={ linkUrl } />;
      component = TestUtils.renderIntoDocument(countDown);
    });

    it('renders anchor with provided text', function() {
      var link = findByClass(component, 'CountDown__link').getDOMNode();
      expect(link.textContent).toBe('get foobarred');
    });
  });

  describe('when the event date is in the future', function() {
    var countDown;
    var component;
    var linkUrl = "http://everydayhero.com/";
    var date    = moment().add(10, 'days').format("YYYY-MM-DD");

    beforeEach(function() {
      countDown = <CountDown date={ date } linkUrl={ linkUrl } />;
      component = TestUtils.renderIntoDocument(countDown);
    });

    it('renders days', function() {
      var element = findByClass(component, 'CountDown__days').getDOMNode();
      expect(element.textContent).toBe("10");
    });

    it('renders a string using past tense', function() {
      var label = findByClass(component, 'CountDown__label').getDOMNode();
      expect(label.textContent).toBe('days to go');
    });

    it('renders an anchor with a link url', function() {
      var link = findByClass(component, 'CountDown__link').getDOMNode();
      expect(link.href).toBe(linkUrl);
    });
  });

  describe('when the event date is in the past', function() {
    var countDown;
    var component;
    var linkUrl = "http://everydayhero.com/";
    var date    = moment().subtract(10, 'days').format("YYYY-MM-DD");

    beforeEach(function() {
      countDown = <CountDown date={ date } linkUrl={ linkUrl } />;
      component = TestUtils.renderIntoDocument(countDown);
    });

    it('renders days', function() {
      var element = findByClass(component, 'CountDown__days').getDOMNode();
      expect(element.textContent).toBe("10");
    });

    it('renders a string using past tense', function() {
      var label = findByClass(component, 'CountDown__label').getDOMNode();
      expect(label.textContent).toBe('days ago');
    });

    it('renders text telling the user the event is finished', function() {
      var element = findByClass(component, 'CountDown__finished').getDOMNode();
      expect(element.textContent).toBe('This event has now finished.');
    });
  });
});
