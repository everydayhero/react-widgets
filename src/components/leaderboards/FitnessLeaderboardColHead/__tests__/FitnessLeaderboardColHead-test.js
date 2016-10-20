jest.disableAutomock();

import React from 'react';
import TestUtils from 'react-addons-test-utils';
var findByClass           = TestUtils.findRenderedDOMComponentWithClass;

import FitnessLeaderboardColHead from '../';

class TestWrapper extends React.Component {
  render () {
    return (
      <table>
        <tbody>
          <tr>
            <FitnessLeaderboardColHead { ...this.props }/>
          </tr>
        </tbody>
      </table>
    )
  }
}

describe('FitnessLeaderboardColHead', function() {
  describe('Default behaviour', function() {
    it('calls a function onclick', function() {
      var callback  = jest.genMockFunction();
      var component = TestUtils.renderIntoDocument(
        <TestWrapper
          onClick={ callback }
          sort="amount"
          active={ false } />
      );
      var element = findByClass(component, 'FitnessLeaderboardColHead');
      TestUtils.Simulate.click(element);

      expect(callback).toBeCalledWith('amount');
    });

    it('renders a caret if the element is active', function() {
      var leaderboard = <TestWrapper active />;
      var component   = TestUtils.renderIntoDocument(leaderboard);
      var element     = findByClass(component, 'FitnessLeaderboardColHead__icon');

      expect(element).toBeDefined();
    });
  });
});
