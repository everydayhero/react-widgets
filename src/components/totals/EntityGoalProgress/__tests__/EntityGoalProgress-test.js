"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('FundsRaised', function() {
  var React               = require('react/addons');
  var EntityGoalProgress  = require('../');
  var campaigns           = require('../../../../api/campaigns');
  var TestUtils           = React.addons.TestUtils;
  var findByClass         = TestUtils.findRenderedDOMComponentWithClass;

  var state = { isLoading: false, total: 15000, goal: 30000 };
  var element;

  describe('Component defaults', function() {
    beforeEach(function() {
      campaigns.find.mockClear();
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid="us-22" />);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders GoalProgress text', function() {
      element.setState(state);
      var text = findByClass(element, 'GoalProgress__text');
      expect(text.getDOMNode().textContent).toBe('$150 raised of $300 goal\n')
    });

    it('renders a GoalProgress bar', function() {
      element.setState(state);
      findByClass(element, 'GoalProgress__bar');
    });

    it('handles a single campaign id', function() {
      expect(campaigns.find).toBeCalledWith("us-22", element.onSuccess);
    });
  });

  describe('Goal as property', function() {
    beforeEach(function() {
      campaigns.find.mockClear();
      element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid="us-22" goal={ 55500 }  />);
    });

    it('goal as property', function() {
      element.setState(state);
      var text = findByClass(element, 'GoalProgress__text');
      expect(text.getDOMNode().textContent).toBe('$150 raised of $555 goal\n')
    });
  });
});
