"use strict";

jest.autoMockOff();

describe('LeaderboardPaging', function() {
  var React             = require('react/addons');
  var LeaderboardPaging = require('../');
  var TestUtils         = React.addons.TestUtils;
  var findByClass       = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var leaderboardPaging;
    var component;
    var callback = jest.genMockFunction();

    beforeEach(function() {
      leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 1 } pageCount={ 4 } />;

      component  = TestUtils.renderIntoDocument(leaderboardPaging);
    });

    it('renders a component', function() {
      expect(component).not.toBeNull();
      expect(component.getDOMNode().className).toContain('LeaderboardPaging');
    });
  });
});
