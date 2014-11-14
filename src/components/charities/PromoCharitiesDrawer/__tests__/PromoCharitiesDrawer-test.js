/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React                = require('react/addons');
var PromoCharitiesDrawer = require('../');
var TestUtils            = React.addons.TestUtils;
var findByClass          = TestUtils.findRenderedDOMComponentWithClass;

describe('PromoCharitiesDrawer', function() {

  it('renders a drawer', function() {
    var promoCharitiesDrawer = <PromoCharitiesDrawer label="test drawer name" />;
    var component = TestUtils.renderIntoDocument(promoCharitiesDrawer);
    var element = findByClass(component, 'PromoCharitiesDrawer');

    expect(element.getDOMNode().textContent).toBe('test drawer name');
  });

  it('calls an on click with an index', function() {
    var callback = jest.genMockFunction();
    var promoCharitiesDrawer = <PromoCharitiesDrawer onClick={ callback } label={ 'test tab name' } index={ 1 } />;
    var component = TestUtils.renderIntoDocument(promoCharitiesDrawer);
    var element = findByClass(component, 'PromoCharitiesDrawer');
    TestUtils.Simulate.click(element);

    expect(callback).toBeCalledWith(1);
  });
});
