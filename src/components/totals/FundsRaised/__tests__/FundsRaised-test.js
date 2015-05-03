"use strict";
jest.autoMockOff();
jest.mock('../../../../api/totals');

describe('FundsRaised', function() {
  var React       = require('react/addons');
  var FundsRaised = require('../');
  var totals      = require('../../../../api/totals');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCampaign.mockClear();
      fundsRaised = <FundsRaised campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');
      expect(total.getDOMNode().textContent).toContain('$0.00');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'FundsRaised__title');

      expect(title.getDOMNode().textContent).toBe('Raised To Date');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'FundsRaised__icon');
      expect(icon).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'FundsRaised__loading');
    });

    it('handles a single campaign id', function() {
      expect(totals.findByCampaign.mock.calls.length).toEqual(1);
      expect(totals.findByCampaign).toBeCalledWith("us-22", element.onSuccess);
    });
  });

  describe('working with multiple uids', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCampaign.mockClear();
      fundsRaised = <FundsRaised campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a multiple campaign ids', function() {
      expect(totals.findByCampaign.mock.calls.length).toEqual(2);
      expect(totals.findByCampaign).toBeCalledWith("us-22", element.onSuccess);
      expect(totals.findByCampaign).toBeCalledWith("us-24", element.onSuccess);
    });
  });

  describe('using component props', function() {
    var fundsRaised;
    var element;
    var translation = {
      title: 'asdjasj',
      symbol: '£'
    };

    beforeEach(function() {
      fundsRaised = <FundsRaised i18n={ translation } renderIcon={ false } offset={ 100000 } format={ '0,0' } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('renders a custom title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'FundsRaised__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('check for a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.getDOMNode().textContent).toContain('1,000');
    });

    it('check for a total with offset', function() {
      element.setState({ total: 100000, isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.getDOMNode().textContent).toContain('2,000');
    });
  });

  describe('Number formatting options', function() {
    it('renders in a short format by default', function() {
      var fundsRaised = <FundsRaised campaignUid="au-0" />;
      var element = TestUtils.renderIntoDocument(fundsRaised);

      element.setState({
        isLoading: false,
        total: 1000000
      });

      var total = findByClass(element, 'FundsRaised__total');
      expect(total.getDOMNode().textContent).toBe('$10.00 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var fundsRaised = <FundsRaised campaignUid="au-0" format="0[.]0" />;
      var element = TestUtils.renderIntoDocument(fundsRaised);

      element.setState({
        isLoading: false,
        total: 1000000
      });

      var total = findByClass(element, 'FundsRaised__total');
      expect(total.getDOMNode().textContent).toBe('$10000');
    });
  });
});
