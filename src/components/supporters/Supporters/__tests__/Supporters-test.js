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

    describe('with pages', function() {
      beforeEach(function() {
        callback(leaderboardData);
      });

      it('contains SupporterCards', function() {
        var cards = scryByClass(element, 'SupporterCard');

        expect(cards.length).toBeGreaterThan(0);
      });
    });
  });
});
