/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React                  = require('react/addons');
var TestUtils              = React.addons.TestUtils;
var SearchInput            = require('../');
var findByClass            = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchInput', function() {
   it('renders default label', function() {
      var componenet = <SearchInput autoFocus={ false }/>;
      var element = TestUtils.renderIntoDocument(componenet);

      findByClass(element, 'SearchInput__label');
  });

  it('renders an optional label', function() {
      var componenet = <SearchInput autoFocus={ false } label="foo"/>;
      var element = TestUtils.renderIntoDocument(componenet);
      var label = findByClass(element, 'SearchInput__label');

      expect(label.getDOMNode().textContent).toBe('foo')
  });

  it('does not render a label if input has a value', function() {
      var componenet = <SearchInput autoFocus={ false } label="foo"/>;
      var element = TestUtils.renderIntoDocument(componenet);
      var elementFound = true;
      element.setState({
        hasValue: true
      });

      try {
        findByClass(element, 'SearchInput__label');
      } catch(error) {
        elementFound = false;
      }

      expect(elementFound).toBe(false);
  });

  it('allows custom className', function() {
      var componenet = <SearchInput autoFocus={ false } className="foo"/>;
      var element = TestUtils.renderIntoDocument(componenet);

      findByClass(element, 'foo');
  });

  it('show processing twirler when QueryInProgress', function() {
      var componenet = <SearchInput autoFocus={ false } isQueryInProgress={ true } />;
      var element = TestUtils.renderIntoDocument(componenet);

      findByClass(element, 'SearchInput__progressSpinner');
  });

});
