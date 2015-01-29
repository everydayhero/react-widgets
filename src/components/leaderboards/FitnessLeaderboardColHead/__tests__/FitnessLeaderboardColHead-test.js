"use strict";
jest.autoMockOff();

describe('FitnessLeaderboardColHead', function() {
  var React                 = require('react/addons');
  var FitnessLeaderboardColHead = require('../');
  var TestUtils             = React.addons.TestUtils;
  var findByClass           = TestUtils.findRenderedDOMComponentWithClass;

  describe('Default behaviour', function() {
    it('calls a function onclick', function() {
      var callback    = jest.genMockFunction();
      var leaderboard = <FitnessLeaderboardColHead onClick={ callback } sort="amount" active={ false } />;
      var component   = TestUtils.renderIntoDocument(leaderboard);
      var element     = findByClass(component, 'FitnessLeaderboardColHead');
      TestUtils.Simulate.click(element);

      expect(callback).toBeCalledWith("amount");
    });

    it('renders a caret if the element is active', function() {
      var leaderboard = <FitnessLeaderboardColHead active={ true } />;
      var component   = TestUtils.renderIntoDocument(leaderboard);
      var element     = findByClass(component, 'FitnessLeaderboardColHead__icon');

      expect(element).toBeDefined();
    });
  });
});
