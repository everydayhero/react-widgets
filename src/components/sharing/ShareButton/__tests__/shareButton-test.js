"use strict";

jest.autoMockOff();

describe('Share Button', function() {
  var React                  = require('react/addons');
  var ShareButton            = require('../');
  var ShareBox               = require('../../ShareBox');
  var TestUtils              = React.addons.TestUtils;
  var findByClass            = TestUtils.findRenderedDOMComponentWithClass;
  var findRenderedComponent  = TestUtils.findRenderedComponentWithType;

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

    it('displays a ShareBox when state is open', function() {
      component.setState({ open: true });

      var result   = component.renderShareBox();
      var shareBox = findRenderedComponent(component, ShareBox);

      expect(result).toBeTruthy();
      expect(shareBox).toBeDefined();
    });

    it('can toggle state to be open', function() {
      var result = component.open();
      expect(component.state.open).toBe(true);
    });

    it('can toggle state to be close', function() {
      component.setState({ open: true });

      var result = component.close();
      expect(component.state.open).toBe(false);
    });
  });

  describe('showing only specific buttons', function() {
    var shareBtn;
    var component;

    beforeEach(function() {
      shareBtn = <ShareButton buttons={ ['facebook', 'twitter'] } />;
      component = TestUtils.renderIntoDocument(shareBtn);
    });

    it('filters the list of services by the names of the button props', function() {
      var result = component.filterServices();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('facebook');
      expect(result[1].name).toBe('twitter');
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
