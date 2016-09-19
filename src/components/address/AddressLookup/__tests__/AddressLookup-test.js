jest.disableAutomock();
jest.mock('../../../../api/address');

import address from '../../../../api/address';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AddressLookup from '../';
const scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
import {findRenderedDOMComponentWithAttribute as findByAttribute} from '../../../../test/helpers/scryRenderedDOMComponentsWithAttribute';
var addressSearchResult = { addresses: [
  { id: '123', label: 'TestAddressListing' }
] };
var addressFindResult = { address: {
  street_address: '1 Place Pl',
  extended_address: '',
  locality: 'Sydney',
  postal_code: '2000',
  region: 'New South Wales',
  country_name: 'Australia'
}};

describe('AddressLookup', function() {
  beforeEach(function() {
    address.find.mockClear();
    address.search.mockClear();
  });

  it('allows you to select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__toggle');
    TestUtils.Simulate.click(countrySelect);
    var country = findByClass(element, 'CountrySelectItem--focused');
    TestUtils.Simulate.click(country);
    expect(element.state.country.iso).toBe('AU');
  });

  it('allows you to filter and select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__toggle');
    TestUtils.Simulate.click(countrySelect);
    var input = findByClass(element, 'Input__input');
    TestUtils.Simulate.change(input, { target: { value: 'king' }});
    jest.runAllTimers();
    var country = findByClass(element, 'CountrySelectItem--focused');
    TestUtils.Simulate.click(country);
    expect(element.state.country.iso).toBe('UK');
  });

  it('accepts an existing address', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup address={ addressFindResult.address } />);
    var streetAddress = findByAttribute(element, 'id', 'street_address');
    var locality = findByAttribute(element, 'id', 'locality');
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });

  it('can be uniquely prefixed', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup prefix={ 'testPrefix-' } address={ addressFindResult.address } />);
    var streetAddress = findByAttribute(element, 'name', 'testPrefix-street_address');
    var locality = findByAttribute(element, 'name', 'testPrefix-locality');
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });

  it('UK postcode search requires at least 5 chars', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country="UK"/>);
    var input = findByClass(element, 'Input__input');
    TestUtils.Simulate.change(input, { target: { value: '1234' }});
    jest.runAllTimers();
    expect(address.search).not.toBeCalled();

    TestUtils.Simulate.change(input, { target: { value: '12345' }});
    jest.runAllTimers();
    expect(address.search).lastCalledWith('12345', 'UK', jasmine.any(Function));
  });

  it('Address search requires at least 7 chars', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country="US"/>);
    var input = findByClass(element, 'Input__input');
    TestUtils.Simulate.change(input, { target: { value: '123456' }});
    jest.runAllTimers();
    expect(address.search).not.toBeCalled();

    TestUtils.Simulate.change(input, { target: { value: '1234567' }});
    jest.runAllTimers();
    expect(address.search).lastCalledWith('1234567', 'US', jasmine.any(Function));
  });

  it('returns a list of addresses', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var input = findByClass(element, 'Input__input');
    TestUtils.Simulate.change(input, { target: { value: 'TestAddress' }});
    jest.runAllTimers();
    expect(address.search).lastCalledWith('TestAddress', 'AU', jasmine.any(Function));

    var callback = address.search.mock.calls[0][2];
    callback(addressSearchResult);
    expect(element.state.addressList).toBe(addressSearchResult.addresses);

    var listItem = findByClass(element, 'AddressListing__details');
    expect(listItem.textContent).toContain('TestAddressListing');
  });

  it('address listing has google class for logo styling', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var input = findByClass(element, 'Input__input');
    TestUtils.Simulate.change(input, { target: { value: 'TestAddress' }});
    jest.runAllTimers();

    var callback = address.search.mock.calls[0][2];
    callback(addressSearchResult);

    var list = findByClass(element, 'AddressLookup__list-google');
    expect(list).not.toBeNull();
  });

  it('breaks down a selected US address', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country={ 'US' } />);
    element.setList(addressSearchResult);
    var listItem = findByClass(element, 'AddressListing--focused');
    TestUtils.Simulate.click(listItem);
    expect(address.find).lastCalledWith('123', 'US', jasmine.any(Function));

    var callback = address.find.mock.calls[0][2];
    callback(addressFindResult);
    expect(element.state.address).toBe(addressFindResult.address);

    var pafValidated = findByAttribute(element, 'name', 'paf_validated');
    var streetAddress = findByAttribute(element, 'id', 'street_address');
    var locality = findByAttribute(element, 'id', 'locality');
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
      listItem = findByClass(element, 'AddressListing--focused');
      TestUtils.Simulate.click(listItem);
      expect(address.find).lastCalledWith('123', 'UK', jasmine.any(Function));
      callback = address.find.mock.calls[0][2];
      callback(addressFindResult);
      expect(element.state.address).toBe(addressFindResult.address);
    });

    it('breaks down a selected UK address', function() {
      var pafValidated = findByAttribute(element, 'name', 'paf_validated');
      var streetAddress = findByAttribute(element, 'id', 'street_address');
      var locality = findByAttribute(element, 'id', 'locality');
      expect(pafValidated.value).toBe('true');
      expect(element.state.custom).toBeNull();
      expect(streetAddress.value).toBe('1 Place Pl');
      expect(locality.value).toBe('Sydney');

      TestUtils.Simulate.change(streetAddress, { target: { value: '2 SomeOther St' }});
      jest.runAllTimers();
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
    var manualEntry = findByClass(element, 'AddressLookup__manual');
    TestUtils.Simulate.click(manualEntry);

    var streetAddress = findByAttribute(element, 'id', 'street_address');
    expect(streetAddress.value).toBe('');
    var countryName = findByAttribute(element, 'id', 'country_name');
    expect(countryName.value).toBe('Australia');
  });

  it('allows you to reset the address', function() {
    var validate = jest.genMockFunction();
    var element = TestUtils.renderIntoDocument(<AddressLookup validate={ validate } address={ addressFindResult.address } />);
    var resetButton = findByClass(element, 'AddressLookup__reset');
    TestUtils.Simulate.click(resetButton);
    var addressLookup = findByClass(element, 'AddressLookup');
    expect(addressLookup).not.toBeNull();
    expect(validate).toBeCalled();
  });

  it('allows you to call output callback when reset the address', function() {
    var callback = jasmine.createSpy();
    var element = TestUtils.renderIntoDocument(<AddressLookup address={ addressFindResult.address } output={ callback } />);
    var resetButton = findByClass(element, 'AddressLookup__reset');
    TestUtils.Simulate.click(resetButton);
    expect(callback).toHaveBeenCalled();
  });

  it('disables address lookup for Ireland', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup country="IE" />);
    var breakdown = findByClass(element, 'AddressBreakdown');
    expect(breakdown).not.toBeNull();
    var resetButton = scryByClass(element, 'AddressLookup__reset');
    expect(resetButton.length).toBeLessThan(1);
  });
});
