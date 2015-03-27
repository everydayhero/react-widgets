"use strict";

jest.autoMockOff();

describe('Share Box', function() {
  var React       = require('react/addons');
  var ShareBox    = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var shareBox;
    var component;

    var shareUrls = [
      {
        name: "facebook",
        url: "http://www.facebook.com/sharer.php?u={url}"
      },
      {
        name: "twitter",
        url: "https://twitter.com/share?url={url}&text={title}"
      },
      {
        name: "googleplus",
        url: "https://plus.google.com/share?url={url}",
        icon: "google-plus"
      },
      {
        name: "pinterest",
        url: "https://pinterest.com/pin/create/bookmarklet/?media={img}&url={url}&description={title}"
      }
    ];

    var networks: [
      'facebook',
      'twitter',
      'googleplus',
      'pinterest'
    ];

    beforeEach(function() {
      shareBox = <ShareBox networks  />;
      component = TestUtils.renderIntoDocument(shareBox);
    });

    it('renders something', function() {
      expect(component).not.toBeNull();
    });

    // it('can fetch specific values from an array of social networks', function() {
    //   var facebookUrl = component.fetchValue("facebook", url);
    //   expect(facebookUrl).toEqual('http://www.facebook.com/sharer.php?u={url}');
    // });

    // it('converts an object to a string (window.open config)', function() {

    // });

    // it('opens a popup', function() {

    // });
  });

  // describe('icon display option', function() {
  //   var shareBox;
  //   var component;

  //   beforeEach(function() {
  //     shareBox = <ShareBox renderIcon={ false } />;
  //     component = TestUtils.renderIntoDocument(shareBox);
  //   });

  //   it('has an option that stops the icon from displaying', function() {
  //     expect(component.renderIcon()).toBeFalsy();
  //   });
  // });
});
