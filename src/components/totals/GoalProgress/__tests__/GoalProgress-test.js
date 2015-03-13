"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('FundsRaised', function() {
  var React        = require('react/addons');
  var GoalProgress = require('../');
  var campaigns    = require('../../../../api/campaigns');
  var TestUtils    = React.addons.TestUtils;
  var findByClass  = TestUtils.findRenderedDOMComponentWithClass;
  var numeral      = require('numeral');

  describe('component defaults', function() {
    var goalProgress;
    var element;

    beforeEach(function() {
      campaigns.find.mockClear();
      goalProgress = <GoalProgress campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(goalProgress);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'fa-refresh');
    });

    it('renders a default text', function() {
      element.setState({ isLoading: false });
      findByClass(element, 'GoalProgress__text');
    });

    it('renders a progress bar', function() {
      element.setState({ isLoading: false });
      findByClass(element, 'GoalProgress__bar');
    });

    it('renders an icon by default', function() {
      findByClass(element, 'GoalProgress__icon');
    });

    it('handles a single campaign id', function() {
      expect(campaigns.find).toBeCalledWith("us-22", element.onSuccess);
    });
  });

  describe('using component props', function() {
    var goalProgress;
    var element;
    var goal = 100 * 100;

    beforeEach(function() {
      goalProgress = <GoalProgress goal={ goal } />;
      element = TestUtils.renderIntoDocument(goalProgress);
    });

    it('renders the goal', function() {
      element.setState({ isLoading: false });
      var text = findByClass(element, 'GoalProgress__text');

      expect(text.getDOMNode().textContent).toContain('$100 goal');
    });
  });

  describe('using custom format', function() {
    var goalProgress;
    var element;
    var goal = 1234.56 * 100;
    var format = '0.00';

    beforeEach(function() {
      goalProgress = <GoalProgress goal={ goal } format={ format } />;
      element = TestUtils.renderIntoDocument(goalProgress);
    });

    it('renders the custom format goal', function() {
      element.setState({ isLoading: false });
      var text = findByClass(element, 'GoalProgress__text');
      var custom_goal = '$' + numeral(goal / 100).format(format) + ' goal';

      expect(text.getDOMNode().textContent).toContain(custom_goal);
    });
  });
});
