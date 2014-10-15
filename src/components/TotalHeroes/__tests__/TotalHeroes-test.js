/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../api/pages');

describe('TotalHeroes', function() {
  var React                       = require('react/addons');
  var TotalHeroes                 = require('../');
  var pages                       = require('../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var fundsRaised;
    var element;

    beforeEach(function(){
      totalHeroes = <TotalHeroes campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(totalHeroes);
    });

    it('check that element is rendered', function(){
      expect(element).not.toBeNull();
    });

    it('check for a default total of pages', function(){
      element.setState({isLoading: false});
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });

    it('check for a default title', function(){
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe('Heroes');
    });

    it('check for default loading text', function(){
      var loading = findByClass(element, 'TotalHeroes__loading');

      expect(loading.getDOMNode().textContent).toContain('Loading...');
    });

    it('check that a campaign id is present', function(){
      expect(pages.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var totalHeroes;
    var element;
    var translation = {
      title: 'blahblah'
    }

    beforeEach(function(){
      fundsRaised = <TotalHeroes i18n={ translation } />;
      element = TestUtils.renderIntoDocument(fundsRaised);
    });

    it('check for a default title', function(){
      var title = findByClass(element, 'TotalHeroes__title');

      expect(title.getDOMNode().textContent).toBe(translation.title);
    });

    it('check for a default total', function(){
      element.setState({isLoading: false});
      var total = findByClass(element, 'TotalHeroes__total');

      expect(total.getDOMNode().textContent).toContain('0');
    });
  });
});