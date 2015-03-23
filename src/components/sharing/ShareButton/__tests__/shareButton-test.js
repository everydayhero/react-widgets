"use strict";

jest.autoMockOff();

describe('Share Button', function() {
  var React       = require('react/addons');
  var ShareButton = require('../');
  var ShareBox    = require('../../ShareBox');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;

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
      var icon = findByTag(component, 'ShareButton__icon').getDOMNode();
      expect(icon).toBeDefined();
    });

    it('has default button label text', function() {

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
      var icon = findByTag(component, 'ShareButton__icon').getDOMNode();
      expect(icon).toBeUndefined();
    });
  });

  describe('sharing pop-up box', function() {
    var shareBtn;
    var component;

    beforeEach(function() {
      shareBtn = <ShareButton />;
      component = TestUtils.renderIntoDocument(shareBtn);
    });

    it('displays when the share button is clicked', function() {
      component.setState({ active: true });

      var shareBox = <ShareBox />;
      var renderShareBox = component.renderShareBox();

      expect(renderShareBox).toBeUndefined();
    });

    it('closes when anything outside the box is clicked', function() {
      // TODO
    });
  });
});
