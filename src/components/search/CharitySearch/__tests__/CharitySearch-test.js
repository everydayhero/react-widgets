/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var _ = require('lodash');
var nothing = jasmine.createSpy();
_.debounce = function(arg) { return nothing; };

describe('SearchOrganisations', function() {
  var React                       = require('react/addons');
  var TestUtils                   = React.addons.TestUtils;
  var SearchOrganisations         = require('../');
  var AppDispatcher               = require('../../../../dispatcher/AppDispatcher');
  var scryByClass                 = TestUtils.scryRenderedDOMComponentsWithClass;
  var scryByTag                   = TestUtils.scryRenderedDOMComponentsWithTag

  describe('renders according to open and close state', function() {
    it('renders nothing when it is closed', function() {
      var searchOrganisations = <SearchOrganisations autoFocus={ false } />;
      var element = TestUtils.renderIntoDocument(searchOrganisations);
      expect(element.getDOMNode()).toBeFalsy();

    });

    it('renders something when "openSearchOrganisations" is triggered', function() {
      AppDispatcher.triggerAction('openSearchOrganisations');
      var searchOrganisations = <SearchOrganisations autoFocus={ false } />;
      var element = TestUtils.renderIntoDocument(searchOrganisations);
      expect(element.getDOMNode()).toBeTruthy();
    });
  });

  describe('initiates searches on onChange events', function() {
    it('do search', function() {
      var searchOrganisations = TestUtils.renderIntoDocument(<SearchOrganisations autoFocus={ false } />);
      var input = scryByTag(searchOrganisations, 'input');
      TestUtils.Simulate.change(input[0]);
      expect(nothing).toHaveBeenCalled();
    });
  });
});
