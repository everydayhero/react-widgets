jest.disableAutomock();

import React from 'react';
import ShareBox from '../';
import ShareIcon from '../../ShareIcon/';
import TestUtils from 'react-addons-test-utils';

describe('Share Box', function() {
  let scryRenderedComponents = TestUtils.scryRenderedComponentsWithType;

  var mockServices = [
    { name: 'facebuck', url: 'http://facebuck.com/' },
    { name: 'tweetor', url: 'http://tweetor.com/' },
    { name: 'goobleplos', url: 'http://goobleplos.com/' }
  ];

  describe('component defaults', function() {
    var shareBox;
    var component;

    beforeEach(function() {
      shareBox  = <ShareBox services={ mockServices } />;
      component = TestUtils.renderIntoDocument(shareBox);
    });

    it('renders something', function() {
      expect(component).not.toBeNull();
    });

    it('will attempt to render service buttons', function() {
      var result      = component.renderServiceButtons();
      var icons       = scryRenderedComponents(component, ShareIcon);

      expect(result).toBeTruthy();
      expect(icons.length).toBe(mockServices.length);
    });
  });

  describe('when an empty service array is provided', function() {
    var shareBox;
    var component;

    beforeEach(function() {
      shareBox = <ShareBox services={ [] } />;
      component = TestUtils.renderIntoDocument(shareBox);
    });

    it('will not render any service buttons', function() {
      var result = component.renderServiceButtons();
      var icons  = scryRenderedComponents(component, ShareIcon);

      expect(result).toBeFalsy();
      expect(icons.length).toBe(0);
    });
  });

});
