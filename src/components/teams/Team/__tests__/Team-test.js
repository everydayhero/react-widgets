"use strict";
jest.autoMockOff();

describe('Team', function() {
  var React     = require('react');
  var Team      = require('../');
  var TestUtils = require('react-addons-test-utils');
  var findByTag = TestUtils.findRenderedDOMComponentWithTag;

  describe('component defaults', function() {
    var team;
    var element;

    beforeEach(function() {
      team = <Team />;
      element = TestUtils.renderIntoDocument(team);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });

  describe('component with custom props', function() {
    var team;
    var element;
    var props = {
      pageUrl: "http://everydayhero.com/us",
      title: "Wonderful Team"
    };

    beforeEach(function() {
      team = <Team title={ props.title }  pageUrl={ props.pageUrl } />;
      element = TestUtils.renderIntoDocument(team);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an anchor with custom url and title prop', function() {
      var anchor = findByTag(element, 'a');
      expect(anchor.href).toBe(props.pageUrl);
    });

    it('renders an image with alt tag including custom title prop', function() {
      var image = findByTag(element, 'img');
      expect(image.alt).toBe(props.title);
    });
  });
});
