'use strict';

jest.autoMockOff();

describe('LeaderboardPaging', function() {
  var React             = require('react');
  var ReactDOM          = require('react-dom');
  var LeaderboardPaging = require('../');
  var TestUtils         = require('react-addons-test-utils');

  describe('component defaults', function() {
    var leaderboardPaging;
    var component;
    var callback = jest.genMockFunction();

    beforeEach(function() {
      leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 1 } pageCount={ 4 } />;

      component  = TestUtils.renderIntoDocument(leaderboardPaging);
    });

    it('renders a component', function() {
      expect(ReactDOM.findDOMNode(component).classList.contains('LeaderboardPaging')).toBe(true);
    });
  });
});
