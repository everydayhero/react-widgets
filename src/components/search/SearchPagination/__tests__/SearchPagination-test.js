/** @jsx React.DOM */
"use strict";

jest.autoMockOff();

describe('SearchPagination', function() {
  var React            = require('react/addons');
  var SearchPagination = require('../SearchPagination');
  var TestUtils        = React.addons.TestUtils;
  var findByClass      = TestUtils.findRenderedDOMComponentWithClass;

  it('renders the page details', function() {
     var data = [{
      id: 1
    },
    {
      id: 2
    }];

    var element = TestUtils.renderIntoDocument(
        <SearchPagination
          results={data}
          totalPages={2}
          page={2}
          pageSize={10}
          count={12} />
      );

    var details = findByClass(element, 'SearchPagination__counter');
    expect(details.getDOMNode().textContent).toBe('10 - 12 of 12');
  });

});
