"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('Leaderboard', function() {
  var React                       = require('react/addons');
  var Leaderboard                 = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var leaderboard;
    var element;

    beforeEach(function() {
      leaderboard = <Leaderboard campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default heading', function() {
      var heading = findByClass(element, 'Leaderboard__heading');

      expect(heading.getDOMNode().textContent).toBe('Leaderboard > Top Individuals');
    });
  });

  describe('component props', function() {
    var leaderboard;
    var element;
    var translation = {
      heading: 'Top Individuals'
    };

    beforeEach(function() {
      leaderboard = <Leaderboard campaignUid="au-0" i18n={ translation } />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders a custom heading', function() {
      var heading = findByClass(element, 'Leaderboard__heading');

      expect(heading.getDOMNode().textContent).toBe(translation.heading);
    });
  });
});
