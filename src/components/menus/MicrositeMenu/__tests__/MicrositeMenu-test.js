"use strict";
jest.autoMockOff();

describe('MicrositeMenu', function() {
  var _                 = require('lodash');
  var React             = require('react/addons');
  var MicrositeMenu     = require('../');
  var Emitter           = require('../../../../lib/EventEmitter');
  var TestUtils         = React.addons.TestUtils;
  var findByClass       = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass       = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var menu;
    var element;

    beforeEach(function() {
      menu = <MicrositeMenu />;
      element = TestUtils.renderIntoDocument(menu);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders the static item', function() {
      findByClass(element, 'MicrositeMenu__static');
    });
  });

  describe('dynamic items', function() {
    var menu;
    var element;

    beforeEach(function() {
      menu = <MicrositeMenu eventIds={ ['Leaderboard/hasContent'] } />;
      element = TestUtils.renderIntoDocument(menu);
    });

    it('should not render leaderboard menu when no dynamic content', function() {
      Emitter.emit('Leaderboard/hasContent', {id: 'board', hasContent: false});
      expect(scryByClass(element, 'MicrositeMenu__dynamic').length).toBe(0);
    });

    it('renders leaderboard menu when has dynamic contents', function() {
      Emitter.emit('Leaderboard/hasContent', {id: 'board', hasContent: true});
      findByClass(element, 'MicrositeMenu__dynamic');
    });
  });
});
