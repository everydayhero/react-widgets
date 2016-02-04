"use strict";
jest.autoMockOff();

var _           = require('lodash');
_.debounce      = require('../../../../test/helpers/debounce'); // testable version of debounce

var React       = require('react');
var SearchInput = require('../');
var TestUtils   = require('react-addons-test-utils');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByTag   = TestUtils.findRenderedDOMComponentWithTag;

describe('SearchInput', function() {
  it('allows custom className', function() {
    var component = <SearchInput className="foo" />;
    var element = TestUtils.renderIntoDocument(component);

    findByClass(element, 'foo');
  });

  it('allows an optional placeholder', function() {
    var component = <SearchInput label="foo" />;
    var element = TestUtils.renderIntoDocument(component);
    var input = findByClass(element, 'SearchInput__input');

    expect(input.getDOMNode().getAttribute('placeholder')).toBe('foo');
  });

  it('allows an optional searchTerm', function() {
    var component = <SearchInput searchTerm="bar" />;
    var element = TestUtils.renderIntoDocument(component);
    var input = findByClass(element, 'SearchInput__input');

    expect(input.getDOMNode().value).toBe('bar');
  });

  it('show processing twirler when QueryInProgress', function() {
    var component = <SearchInput isSearching={ true } />;
    var element = TestUtils.renderIntoDocument(component);

    findByClass(element, 'SearchInput__progressSpinner');
  });

  it('auto focuses on autoFocus', function() {
    var component = <SearchInput autoFocus={ true } />;
    var element = TestUtils.renderIntoDocument(component);
    var input = findByTag(element, 'input');

    expect(input.getDOMNode()).toBe(document.activeElement);

    // teardown: must unfocus elements or other tests fail
    input.getDOMNode().blur();
  });

  it('calls onChange on change', function() {
    var callback = jest.genMockFunction();
    var component = <SearchInput onChange={ callback } />;
    var element = TestUtils.renderIntoDocument(component);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalledWith('foo');
  });

  it('debounces input changes', function() {
    var callback = jest.genMockFunction();
    var component = <SearchInput onChange={ callback } />;
    var element = TestUtils.renderIntoDocument(component);
    var input = findByTag(element, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'foo' } });
    TestUtils.Simulate.change(input, { target: { value: 'bar' } });

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback.mock.calls.length).toEqual(1);
    expect(callback).toBeCalledWith('bar');
  });
});
