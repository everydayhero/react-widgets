/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React               = require('react/addons');
var CharitySearchResult = require('../');
var TestUtils           = React.addons.TestUtils;
var findByClass         = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass         = TestUtils.scryRenderedDOMComponentsWithClass;

describe('it renders a charity result', function() {
  var result = {
    name: 'Foo',
    description: 'Blah blah blah',
    locality: 'Brisbane',
    region: 'Queensland'
  };

  it('renders charity result', function() {
    var searchResult = <CharitySearchResult result={ result } />;
    var component    = TestUtils.renderIntoDocument(searchResult);
    var element      = findByClass(component, 'SearchResult');
    var header       = findByClass(component, 'CharitySearchResult__header');
    var description  = findByClass(component, 'CharitySearchResult__description');
    var footer       = findByClass(component, 'CharitySearchResult__footer');

    expect(element).toBeDefined();
    expect(header.getDOMNode().textContent).toBe(result.name);
    expect(description.getDOMNode().textContent).toBe(result.description);
    expect(footer.getDOMNode().textContent).toBe(result.locality + ', ' + result.region);
  });

  it('includes charity logo if exist', function() {
    var result = { name: 'Foo', logo_url: 'blah' };
    var searchResult = <CharitySearchResult result={ result } selectAction='Blah' />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var logo = findByClass(component, 'CharitySearchResult__logo');
    var avatar = scryByClass(component, 'CharitySearchResult__avatar');

    expect(logo).toBeDefined();
    expect(avatar.length).toBe(0);
  });

  it('includes default charity avatar if no logo', function() {
    var result = { name: 'Foo' };
    var searchResult = <CharitySearchResult result={ result } selectAction='Blah' />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var avatar = findByClass(component, 'CharitySearchResult__avatar');
    var logo = scryByClass(component, 'CharitySearchResult__logo');

    expect(avatar).toBeDefined();
    expect(logo.length).toBe(0);
  });

  it('includes selectAction', function() {
    var searchResult = <CharitySearchResult result={ result } selectAction='Blah' />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var action = findByClass(component, 'CharitySearchResult__actions');

    expect(action.getDOMNode().textContent).toBe('Blah');
  });
});
