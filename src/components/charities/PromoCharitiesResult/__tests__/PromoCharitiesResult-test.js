"use strict";
jest.autoMockOff();

var React                = require('react/addons');
var PromoCharitiesResult = require('../');
var TestUtils            = React.addons.TestUtils;
var findByClass          = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchResult', function() {
  var result = {
    category:     'test tab 1',
    id:           'au-1',
    name:         'test charity 1',
    description:  'test description 1',
    url:          'http://test-url.com/1',
    logo_url:     'http://test-image-url.com/1',
    slug:         'test-slug-1',
    country_code: 'au'
  };

  it('renders a result', function() {
    var promoCharitiesResult = <PromoCharitiesResult result={ result } />;
    var component = TestUtils.renderIntoDocument(promoCharitiesResult);
    var element = findByClass(component, 'PromoCharitiesResult');

    expect(element).not.toBeNull();
  });

  it('calls onSelect on click', function() {
    var callback = jest.genMockFunction();
    var promoCharitiesResult = <PromoCharitiesResult result={ result } onSelect={ callback } />;
    var component = TestUtils.renderIntoDocument(promoCharitiesResult);
    var element = findByClass(component, 'PromoCharitiesResult');
    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(result);
  });
});
