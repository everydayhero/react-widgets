/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('FundsRaised', function() {
  var React                       = require('react/addons');
  var FundsRaised                 = require('../');
  var campaigns                   = require('../../../../api/campaigns');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      fundsRaised = <FundsRaised campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.getDOMNode().textContent).toContain('$0.00');
    });

    it('renders a default title', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'FundsRaised__title');

      expect(title.getDOMNode().textContent).toBe('Raised To Date');
    });

    it('renders a loading icon', function() {
      element.setState({isLoading: true});
      findByClass(element, 'FundsRaised__loading');
    });

    it('handles a campaign id', function() {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var fundsRaised;
    var element;
    var translation = {
      title: 'asdjasj',
      symbol: '£'
    }

    beforeEach(function() {
      fundsRaised = <FundsRaised i18n={ translation } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('renders a custom title', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'FundsRaised__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('check for a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.getDOMNode().textContent).toContain('£0.00');
    });
  });
});
