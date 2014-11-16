/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React             = require('react/addons');
var PromoCharitiesTab = require('../');
var TestUtils         = React.addons.TestUtils;
var findByClass       = TestUtils.findRenderedDOMComponentWithClass;

describe('PromoCharitiesTab', function() {
  it('renders a tab', function() {
    var promoCharitiesTab = <PromoCharitiesTab label="test tab name" />;
    var component = TestUtils.renderIntoDocument(promoCharitiesTab);
    var element = findByClass(component, 'PromoCharitiesTab');

    expect(element.getDOMNode().textContent).toBe('test tab name');
  });

  it('calls an on click with an index', function() {
    var callback = jest.genMockFunction();
    var promoCharitiesTab = <PromoCharitiesTab onClick={ callback } label={ 'test tab name' } index={ 1 } />;
    var component = TestUtils.renderIntoDocument(promoCharitiesTab);
    var element = findByClass(component, 'PromoCharitiesTab');
    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(1);
  });
});
