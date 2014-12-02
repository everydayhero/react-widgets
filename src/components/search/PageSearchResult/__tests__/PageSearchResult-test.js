"use strict";
jest.autoMockOff();

var React            = require('react/addons');
var PageSearchResult = require('../');
var TestUtils        = React.addons.TestUtils;
var findByClass      = TestUtils.findRenderedDOMComponentWithClass;
var findByTag        = TestUtils.findRenderedDOMComponentWithTag;

describe('it renders a result', function() {
  var result = {
    name: 'Foo',
    url: 'http://foo.com/',
    charity: {
      name: 'Bar'
    },
    campaign: {
      name: 'Baz'
    },
    image: {
      small_image_url: 'blah.png'
    }
  };

  it('renders page result', function() {
    var searchResult = <PageSearchResult result={ result } />;
    var component    = TestUtils.renderIntoDocument(searchResult);
    var element      = findByClass(component, 'SearchResult');
    var header       = findByClass(component, 'PageSearchResult__header');
    var description  = findByClass(component, 'PageSearchResult__description');
    var footer       = findByClass(component, 'PageSearchResult__footer');
    var avatar       = findByTag(component, 'img');

    expect(element).toBeDefined();
    expect(element.getDOMNode().href).toBe(result.url);
    expect(avatar.getDOMNode().getAttribute('src')).toBe(result.image.small_image_url);
    expect(header.getDOMNode().textContent).toBe(result.name);
    expect(description.getDOMNode().textContent).toBe(result.charity.name);
    expect(footer.getDOMNode().textContent).toBe(result.campaign.name);
  });

  it('includes selectAction', function() {
    var searchResult = <PageSearchResult result={ result } selectAction='Blah' />;
    var component = TestUtils.renderIntoDocument(searchResult);
    var action = findByClass(component, 'PageSearchResult__actions');

    expect(action.getDOMNode().textContent).toBe('Blah');
  });
});
