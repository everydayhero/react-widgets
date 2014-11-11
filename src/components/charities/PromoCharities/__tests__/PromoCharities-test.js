/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('PromoCharities', function() {
  var React          = require('react/addons');
  var PromoCharities = require('../');
  var endPoint       = require('../../../../api/charities');
  var TestUtils      = React.addons.TestUtils;
  var findByClass    = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var promoCharities;
    var element;

    beforeEach(function() {
      promoCharities = <PromoCharities />;
      element = TestUtils.renderIntoDocument(promoCharities);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
