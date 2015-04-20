"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var Button      = require('../');
var TestUtils   = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByTag = TestUtils.scryRenderedDOMComponentsWithTag;

describe('Button', function() {
  var component;

  describe('cta', function() {
    var clicked = false;

    beforeEach(function() {
      clicked = false;
      var onClick = function(){
        clicked = true;
      };

      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' onClick={ onClick }/>
      );
    });

    it('renders a CTA button', function(){
      findByClass(component, 'Button--cta');
    });

    it('handles click events', function(){
      var node = scryByTag(component, 'button')[0];
      TestUtils.Simulate.mouseUp(node);

      expect(clicked).toBe(true);
    });
  });

  describe('primary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='primary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a primary button', function(){
      findByClass(component, 'Button--primary');
    });
  });

  describe('secondary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='secondary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a secondary button', function(){
      findByClass(component, 'Button--secondary');
    });
  });

  describe('tertiary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='tertiary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a tertiary button', function(){
      findByClass(component, 'Button--tertiary');
    });
  });

  describe('href', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' href="http://foo" />
      );
    });

    it('renders an anchor when given a href', function(){
      expect(scryByTag(component, 'a').length).toBe(1);
    });
  });

  describe('reverse', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' reverse={ true } />
      );
    });

    it('reverses the button', function(){
      findByClass(component, 'Button--reverse');
    });
  });

  describe('thin', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' thin={ true } />
      );
    });

    it('renders a thin button', function(){
      findByClass(component, 'Button--thin');
    });
  });

  describe('iconLeft', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' iconLeft={ true } />
      );
    });

    it('renders the icon left', function(){
      findByClass(component, 'Button--iconLeft');
    });
  });

  describe('disabled', function() {

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' disabled={ true } />
      );
    });

    it('disables the button', function(){
      findByClass(component, 'Button--disabled');
    });
  });

  describe('noBorder', function() {

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' border={ false } />
      );
    });

    it('has no border', function(){
      findByClass(component, 'Button--noBorder');
    });
  });
});
