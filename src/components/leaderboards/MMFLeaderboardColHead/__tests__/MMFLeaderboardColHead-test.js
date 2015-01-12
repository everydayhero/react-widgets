"use strict";
jest.autoMockOff();

describe('MMFLeaderboardColHead', function() {
  var React                 = require('react/addons');
  var MMFLeaderboardColHead = require('../');
  var TestUtils             = React.addons.TestUtils;
  var findByClass           = TestUtils.findRenderedDOMComponentWithClass;

  describe('Handling clicks', function() {
    it('calls a function onclick', function() {
      var callback    = jest.genMockFunction();
      var leaderboard = <MMFLeaderboardColHead onClick={ callback } sort="amount" active={ false } />;
      var component   = TestUtils.renderIntoDocument(leaderboard);
      var element     = findByClass(component, 'MMFLeaderboardColHead');
      TestUtils.Simulate.click(element);

      expect(callback).toBeCalledWith("amount");
    });

    it('renders a caret if the element is active', function() {
      var leaderboard = <MMFLeaderboardColHead active={ true } />;
      var component   = TestUtils.renderIntoDocument(leaderboard);
      var element     = findByClass(component, 'MMFLeaderboardColHead__icon');

      expect(element).toBeDefined();
    });
  });
});
