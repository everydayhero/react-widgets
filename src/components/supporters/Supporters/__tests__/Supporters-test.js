"use strict";
jest.autoMockOff();

jest.mock('../../../../api/charities');
var charities = require('../../../../api/charities');

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var Supporters  = require('../');

var emptyData = { leaderboard: { pages: [] } };
var leaderboardData = require('./Supporters-data.json');

describe('Supporters', function() {
  var element;
  var callback;
  var props = {
    charityUid: 'us-123'
  };

  beforeEach(function() {
    charities.leaderboard.mockClear();
  });

  describe('with default params', function() {
    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Supporters { ...props }/>);
      callback = charities.leaderboard.mock.calls[0][3];
    });

    it('renders', function() {
      expect(element.getDOMNode()).not.toBeNull();
    });

    it('renders a Supporters element', function() {
      expect(findByClass(element, 'Supporters')).not.toBeNull();
    });

    it('shows loading icon', function() {
      expect(findByClass(element, 'Supporters__loading').getDOMNode()).not.toBeNull();
      expect(scryByClass(element, 'Supporters__empty-label').length).toBe(0);
    });

    it('shows empty label when empty', function() {
      callback(emptyData);

      expect(findByClass(element, 'Supporters__empty-label').getDOMNode()).not.toBeNull();
      expect(scryByClass(element, 'Supporters__loading').length).toBe(0);
    });

    describe('with pages', function() {
      beforeEach(function() {
        callback(leaderboardData);
      });

      it('does not show loading icon', function() {
        expect(scryByClass(element, 'Supporters__loading').length).toBe(0);
      });

      it('does not show empty label', function() {
        expect(scryByClass(element, 'Supporters__empty-label').length).toBe(0);
      });

      it('contains SupporterCards', function() {
        var cards = scryByClass(element, 'SupporterCard');

        expect(cards.length).toBeGreaterThan(0);
      });
    });
  });
});
