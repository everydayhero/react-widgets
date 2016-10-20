jest.disableAutomock();

import React from 'react';
import Team from '../';
import TestUtils from 'react-addons-test-utils';

describe('Team', function() {
  let findByTag = TestUtils.findRenderedDOMComponentWithTag;

  describe('component defaults', function() {
    let team;
    let element;

    beforeEach(function() {
      team = <Team />;
      element = TestUtils.renderIntoDocument(team);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });

  describe('component with custom props', function() {
    let team;
    let element;
    let props = {
      pageUrl: 'http://everydayhero.com/us',
      title: 'Wonderful Team'
    };

    beforeEach(function() {
      team = <Team title={ props.title }  pageUrl={ props.pageUrl } />;
      element = TestUtils.renderIntoDocument(team);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an anchor with custom url and title prop', function() {
      let anchor = findByTag(element, 'a');
      expect(anchor.href).toBe(props.pageUrl);
    });

    it('renders an image with alt tag including custom title prop', function() {
      let image = findByTag(element, 'img');
      expect(image.alt).toBe(props.title);
    });
  });
});
