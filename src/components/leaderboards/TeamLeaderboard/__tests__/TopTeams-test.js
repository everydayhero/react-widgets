/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('FundsRaised', function() {
  var React                       = require('react/addons');
  var RecentFundraisers           = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var RecentFundraisers;
    var element;

    beforeEach(function() {
      recentFundraisers = <RecentFundraisers campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(recentFundraisers);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a default total', function() {
      element.setState({isLoading: false});
      var total = findByClass(element, 'FundsRaised__total');

      expect(total.getDOMNode().textContent).toContain('$0.00');
    });

    it('renders a default heading', function() {
      element.setState({isLoading: false});
      var heading = findByClass(element, 'RecentFundraisers__heading');

      expect(heading.getDOMNode().textContent).toBe('Fundraisers');
    });

    // it('renders a loading icon', function() {
    //   element.setState({isLoading: true});
    //   findByClass(element, 'FundsRaised__loading');
    // });

    it('handles a campaign id', function() {
      expect(pages.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  // describe('component props', function() {
  //   var fundsRaised;
  //   var element;
  //   var translation = {
  //     title: 'asdjasj',
  //     symbol: '£'
  //   }

  //   beforeEach(function() {
  //     fundsRaised = <FundsRaised i18n={ translation } renderIcon={ false } />;
  //     element = TestUtils.renderIntoDocument(fundsRaised);
  //   });

  //   it('renders a custom title', function() {
  //     element.setState({isLoading: false});
  //     var title = findByClass(element, 'FundsRaised__title');

  //     expect(title.getDOMNode().textContent).toBe(translation.title);
  //   });

  //   it('check for a default total', function() {
  //     element.setState({isLoading: false});
  //     var total = findByClass(element, 'FundsRaised__total');

  //     expect(total.getDOMNode().textContent).toContain('£0.00');
  //   });
  // });
});
