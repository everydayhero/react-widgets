"use strict";

jest.autoMockOff();

describe('Share Button', function() {
  var React       = require('react/addons');
  var ShareButton = require('../');
  var ShareBox    = require('../../ShareBox');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var shareBtn;
    var component;

    beforeEach(function() {
      shareBtn = <ShareButton />;
      component = TestUtils.renderIntoDocument(shareBtn);
    });

    it('renders something', function() {
      expect(component).not.toBeNull();
    });

    it('displays a sharing icon by default', function() {
      var icon = findByClass(component, 'ShareButton__icon').getDOMNode();
      expect(icon).toBeDefined();
      expect(component.renderIcon()).toBeTruthy();
    });

    it('has default button label text', function() {
      var label = findByClass(component, 'ShareButton__label').getDOMNode();
      expect(label).toBeDefined();
      expect(label.textContent).toBe('Share this page');
    });
  });

  describe('icon display option', function() {
    var shareBtn;
    var component;

    beforeEach(function() {
      shareBtn = <ShareButton renderIcon={ false } />;
      component = TestUtils.renderIntoDocument(shareBtn);
    });

    it('has an option that stops the icon from displaying', function() {
      expect(component.renderIcon()).toBeFalsy();
    });
  });
});
