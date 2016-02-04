"use strict";
jest.autoMockOff();
jest.mock('../../../../api/totals');

describe('FundsRaised', function() {
  var React       = require('react');
  var FundsRaised = require('../');
  var totals      = require('../../../../api/totals');
  var TestUtils   = require('react-addons-test-utils');
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('component defaults', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCampaigns.mockClear();
      fundsRaised = <FundsRaised campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');
      expect(total.textContent).toContain('$0.00');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var title = findByClass(element, 'FundsRaised__title');

      expect(title.textContent).toBe('Raised To Date');
    });

    it('renders an icon by default', function() {
      var icon = findByClass(element, 'FundsRaised__icon');
      expect(icon).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'FundsRaised__loading');
    });
  });

  describe('single campaign id', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCampaigns.mockClear();
      fundsRaised = <FundsRaised campaignUid="us-22" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a single campaign id', function() {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1);
      expect(totals.findByCampaigns).toBeCalledWith({campaignUids: "us-22"}, element.onSuccess, {});
    });
  });

  describe('single page id', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByPages.mockClear();
      fundsRaised = <FundsRaised pageId="848751" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a single page id', function() {
      expect(totals.findByPages.mock.calls.length).toEqual(1);
      expect(totals.findByPages).toBeCalledWith("848751", element.onSuccess, {});
    });
  });

  describe('single charity id', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      fundsRaised = <FundsRaised charityUid="au-31" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a single charity id', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-31"}, element.onSuccess, {});
    });
  });

  describe('multiple charity ids', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      fundsRaised = <FundsRaised charityUids={ ["au-27", "au-28"] } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles multiple charity ids', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: ["au-27", "au-28"]}, element.onSuccess, {});
    });
  });

  describe('working with multiple uids', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCampaigns.mockClear();
      fundsRaised = <FundsRaised campaignUids={ ["us-22", "us-24"] } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a multiple campaign ids', function() {
      expect(totals.findByCampaigns.mock.calls.length).toEqual(1);
      expect(totals.findByCampaigns).toBeCalledWith({campaignUids: ["us-22", "us-24"]}, element.onSuccess, {});
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

      expect(title.textContent).toBe(translation.title);
    });

    it('check for a default total', function() {
      element.setState({ isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.textContent).toContain('1,000');
    });

    it('check for a total with offset', function() {
      element.setState({ total: 100000, isLoading: false });
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.textContent).toContain('2,000');
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
      expect(total.textContent).toBe('$10.00 k');
    });

    it('renders a different format if given acceptable numeral.js string', function() {
      var fundsRaised = <FundsRaised campaignUid="au-0" format="0[.]0" />;
      var element = TestUtils.renderIntoDocument(fundsRaised);

      element.setState({
        isLoading: false,
        total: 1000000
      });

      var total = findByClass(element, 'FundsRaised__total');
      expect(total.textContent).toBe('$10000');
    });
  });

  describe('Displaying an icon', function() {
    it('renders no icon when renderIcon set to false', function() {
      var fundsRaised = <FundsRaised campaignUid="au-0" renderIcon={ false } />;
      var element = TestUtils.renderIntoDocument(fundsRaised);
      var icon = scryByClass(element, 'FundsRaised__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a custom icon when passed a valid FontAwesome string', function() {
      var fundsRaised = <FundsRaised campaignUid="au-0" renderIcon="paw" />;
      var element = TestUtils.renderIntoDocument(fundsRaised);
      var icon = findByClass(element, 'fa-paw');
      expect(icon).not.toBeNull();
    });
  });

  describe('takes startAt property', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      fundsRaised = <FundsRaised charityUid="au-31" startAt="2015-01-01" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a startAt property', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-31"}, element.onSuccess, {start:'2015-01-01'});
    });
  });

  describe('takes endAt property', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      fundsRaised = <FundsRaised charityUid="au-31" endAt="2015-06-01" />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('handles a endAt property', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-31"}, element.onSuccess, {end:'2015-06-01'});
    });
  });

  describe('Group value filtering', function() {
    var fundsRaised;
    var element;

    beforeEach(function() {
      totals.findByCharities.mockClear();
      fundsRaised = <FundsRaised charityUid="au-31" groupValues={["ABC"]}/>;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('fetches data with a group value specified', function() {
      expect(totals.findByCharities.mock.calls.length).toEqual(1);
      expect(totals.findByCharities).toBeCalledWith({charityUids: "au-31", groupValues:["ABC"]}, element.onSuccess, {});
    });
  });

});
