/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React            = require('react/addons');
var SearchPagination = require('../');
var TestUtils        = React.addons.TestUtils;
var findByClass      = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchPagination', function() {
  it('renders the page details', function() {
    var element = TestUtils.renderIntoDocument(
      <SearchPagination count={12} page={2} pageSize={10} totalPages={2} />
    );

    var details = findByClass(element, 'SearchPagination__counter');
    expect(details.getDOMNode().textContent).toBe('11 - 12 of 12');
  });
});
