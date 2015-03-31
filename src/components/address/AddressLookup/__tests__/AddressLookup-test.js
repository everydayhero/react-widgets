"use strict";
jest.autoMockOff();

jest.mock('../../../../api/address');
var address = require('../../../../api/address');
var _ = require('lodash');
_.debounce = function(callback) { return callback; };

var React = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var AddressLookup = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByProp = require('../../../../test/helpers/scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;
var addressSearchResult = {addresses: [
  { id: '123', label: 'TestAddressListing' }
]};
var addressFindResult = {address: {
  street_address: '1 Place Pl',
  extended_address: '',
  locality: 'Sydney',
  postal_code: '2000',
  region: 'New South Wales',
  country_name: 'Australia' }
};

describe('AddressLookup', function() {
  beforeEach(function() {
    address.find.mockClear();
    address.search.mockClear();
  });

  it('allows you to select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__toggle').getDOMNode();
    TestUtils.Simulate.click(countrySelect);
    var country = findByClass(element, 'CountrySelectItem--focused').getDOMNode();
    TestUtils.Simulate.click(country);
    expect(element.state.country.iso).toBe('AU');
  });

  it('allows you to filter and select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__toggle').getDOMNode();
    TestUtils.Simulate.click(countrySelect);
    var input = findByClass(element, 'Input__input').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "king" } });
    var country = findByClass(element, 'CountrySelectItem--focused').getDOMNode();
    TestUtils.Simulate.click(country);
    expect(element.state.country.iso).toBe('GB');
  });

  it('accepts an existing address', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup address={ addressFindResult.address } />);
    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });

  it('can be uniquely prefixed', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup prefix={ 'testPrefix-' } address={ addressFindResult.address } />);
    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'name', 'testPrefix-street_address').getDOMNode();
    var locality = findByProp(breakdown, 'name', 'testPrefix-locality').getDOMNode();
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });

  it('UK postcode search requires at least 5 chars', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country="GB"/>);
    var input = findByClass(element, 'Input__input').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "1234" } });
    expect(address.search).not.toBeCalled();

    TestUtils.Simulate.change(input, { target: { value: "12345" } });
    expect(address.search).lastCalledWith('12345', 'GB', jasmine.any(Function));
  });

  it('Address search requires at least 7 chars', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country="US"/>);
    var input = findByClass(element, 'Input__input').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "123456" } });
    expect(address.search).not.toBeCalled();

    TestUtils.Simulate.change(input, { target: { value: "1234567" } });
    expect(address.search).lastCalledWith('1234567', 'US', jasmine.any(Function));
  });

  it('returns a list of addresses', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var input = findByClass(element, 'Input__input').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "TestAddress" } });
    expect(address.search).lastCalledWith('TestAddress', 'AU', jasmine.any(Function));

    var callback = address.search.mock.calls[0][2];
    callback(addressSearchResult);
    expect(element.state.addressList).toBe(addressSearchResult.addresses);

    var listItem = findByClass(element, 'AddressListing__details').getDOMNode();
    expect(listItem.textContent).toContain('TestAddressListing');
  });

  it('address listing has google class for logo styling', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var input = findByClass(element, 'Input__input').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "TestAddress" } });

    var callback = address.search.mock.calls[0][2];
    callback(addressSearchResult);

    var list = findByClass(element, 'AddressLookup__list-google');
    expect(list).not.toBeNull();
  });

  it('breaks down a selected US address', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country={ 'US' } />);
    element.setList(addressSearchResult);
    var listItem = findByClass(element, 'AddressListing--focused').getDOMNode();
    TestUtils.Simulate.click(listItem);
    expect(address.find).lastCalledWith('123', 'US', jasmine.any(Function));

    var callback = address.find.mock.calls[0][2];
    callback(addressFindResult);
    expect(element.state.address).toBe(addressFindResult.address);

    var breakdown = findByClass(element, 'AddressBreakdown');
    var pafValidated = findByProp(breakdown, 'name', 'paf_validated').getDOMNode();
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
    expect(pafValidated.value).toBe('false');
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });

  describe('selected address', function() {
    var element, listItem, callback, validate;

    beforeEach(function() {
      address.find.mockClear();
      address.search.mockClear();
      validate = jest.genMockFunction();

      element = TestUtils.renderIntoDocument(<AddressLookup validate={ validate } country={ "UK" }/>);
      element.setList(addressSearchResult);
      listItem = findByClass(element, 'AddressListing--focused').getDOMNode();
      TestUtils.Simulate.click(listItem);
      expect(address.find).lastCalledWith('123', 'GB', jasmine.any(Function));
      callback = address.find.mock.calls[0][2];
      callback(addressFindResult);
      expect(element.state.address).toBe(addressFindResult.address);
    });

    it('breaks down a selected GB address', function() {
      var breakdown = findByClass(element, 'AddressBreakdown');
      var pafValidated = findByProp(breakdown, 'name', 'paf_validated').getDOMNode();
      var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
      var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
      expect(pafValidated.value).toBe('true');
      expect(element.state.custom).toBeNull();
      expect(streetAddress.value).toBe('1 Place Pl');
      expect(locality.value).toBe('Sydney');

      TestUtils.Simulate.change(streetAddress, { target: { value: "2 SomeOther St" } });
      expect(pafValidated.value).toBe('false');
      expect(element.state.custom).not.toBeNull();
    });

    it('calls the validate prop on breaking down a selected address', function() {
      expect(validate).toBeCalled();
    });
  });

  it('breaks down an empty address on manual entry', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country={ 'AU' } />);
    element.setList(addressSearchResult);
    var manualEntry = findByClass(element, 'AddressLookup__manual').getDOMNode();
    TestUtils.Simulate.click(manualEntry);

    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    expect(streetAddress.value).toBe('');
    var countryName = findByProp(breakdown, 'id', 'country_name').getDOMNode();
    expect(countryName.value).toBe('Australia');
  });

  it('allows you to reset the address', function() {
    var validate = jest.genMockFunction();
    var element = TestUtils.renderIntoDocument(<AddressLookup validate={ validate } address={ addressFindResult.address } />);
    var resetButton = findByClass(element, 'AddressLookup__reset').getDOMNode();
    TestUtils.Simulate.click(resetButton);
    var addressLookup = findByClass(element, 'AddressLookup').getDOMNode();
    expect(addressLookup).not.toBeNull();
    expect(validate).toBeCalled();
  });

  it('allows you to call output callback when reset the address', function() {
    var callback = jasmine.createSpy();
    var element = TestUtils.renderIntoDocument(<AddressLookup address={ addressFindResult.address } output={ callback } />);
    var resetButton = findByClass(element, 'AddressLookup__reset').getDOMNode();
    TestUtils.Simulate.click(resetButton);
    expect(callback).toHaveBeenCalled();
  });
});
