/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React                 = require('react/addons');
var PromoCharitiesResults = require('../');
var TestUtils             = React.addons.TestUtils;
var findByClass           = TestUtils.findRenderedDOMComponentWithClass;
var scryByClass           = TestUtils.scryRenderedDOMComponentsWithClass;

describe('PromoCharitiesResults', function() {
  var contents = [
    {
      category:     'test tab 1',
      id:           'au-1',
      name:         'test charity 1',
      description:  'test description 1',
      url:          'http://test-url.com/1',
      logo_url:     'http://test-image-url.com/1',
      slug:         'test-slug-1',
      country_code: 'au'
    },
    {
      category:     'test tab 2',
      id:           'au-2',
      name:         'test charity 2',
      description:  'test description 2',
      url:          'http://test-url.com/2',
      logo_url:     'http://test-image-url.com/2',
      slug:         'test-slug-2',
      country_code: 'au'
    }
  ];

  it('renders all charities results', function() {
    var promoCharitiesResults = <PromoCharitiesResults content={ contents }/>;
    var element = TestUtils.renderIntoDocument(promoCharitiesResults);
    var resultsElement = findByClass(element, 'PromoCharitiesResults');
    var resultElements = scryByClass(element, 'PromoCharitiesResult');

    expect(resultsElement).toBeDefined();
    expect(resultElements.length).toBe(contents.length);
  });
});
