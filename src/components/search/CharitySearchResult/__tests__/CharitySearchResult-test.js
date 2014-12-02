"use strict";
jest.autoMockOff();

var React               = require('react/addons');
var CharitySearchResult = require('../');
var TestUtils           = React.addons.TestUtils;
var findByClass         = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass         = TestUtils.scryRenderedDOMComponentsWithClass;

describe('CharitySearchResult', function() {
  var charity = {
    id: 1,
    name: 'Foo',
    merchant_name: 'Bar',
    description: 'Blah blah blah',
    locality: 'Brisbane',
    region: 'Queensland'
  };

  var result = {
    id: charity.id,
    url: 'http://blah.com/',
    charity: charity
  };

  it('renders charity result', function() {
    var searchResult = <CharitySearchResult result={ result } />;
    var component    = TestUtils.renderIntoDocument(searchResult);
    var element      = findByClass(component, 'SearchResult');
    var header       = findByClass(component, 'CharitySearchResult__header');
    var description  = findByClass(component, 'CharitySearchResult__description');
    var footer       = findByClass(component, 'CharitySearchResult__footer');

    expect(element).toBeDefined();
    expect(element.getDOMNode().href).toBe(result.url);
    expect(header.getDOMNode().textContent).toContain(charity.name);
    expect(header.getDOMNode().textContent).toContain(charity.merchant_name);
    expect(description.getDOMNode().textContent).toBe(charity.description);
    expect(footer.getDOMNode().textContent).toBe(charity.locality + ', ' + charity.region);
  });

  it('does not render merchant name if contained in name', function() {
    var result = { charity: { name: 'Foo Bar', merchant_name: 'Bar' } };
    var searchResult = <CharitySearchResult result={ result } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var header = findByClass(component, 'CharitySearchResult__header');

    expect(header.getDOMNode().textContent).toBe(result.charity.name);
  });

  it('does not render merchant name ignores case and punctuation', function() {
    var result = { charity: { name: '{Foo}?', merchant_name: '<fOO>!' } };
    var searchResult = <CharitySearchResult result={ result } />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var header = findByClass(component, 'CharitySearchResult__header');

    expect(header.getDOMNode().textContent).toBe(result.charity.name);
  });

  it('includes charity logo if exist', function() {
    var result = { charity: { name: 'Foo', logo_url: 'blah' } };
    var searchResult = <CharitySearchResult result={ result } selectAction='Blah' />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var logo = findByClass(component, 'CharitySearchResult__logo');
    var avatar = scryByClass(component, 'CharitySearchResult__avatar');

    expect(logo).toBeDefined();
    expect(avatar.length).toBe(0);
  });

  it('includes default charity avatar if no logo', function() {
    var result = { charity: { name: 'Foo' } };
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
