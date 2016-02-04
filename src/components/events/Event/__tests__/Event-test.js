'use strict';
jest.autoMockOff();

describe('Event', function() {
  var React       = require('react');
  var Event       = require('../');
  var TestUtils   = require('react-addons-test-utils');
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var element;
    var props = {
      id: '1234',
      name: 'A Name',
      date: new Date('2015-01-01'),
      campaignUrl: 'http://google.com/',
      donateUrl: 'http://google.com/',
      getStartedUrl: 'http://google.com/',
      backgroundColor: '#fc0',
      backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
      supporterCount: 50
    };

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(
        <Event key={ props.id }
          name={ props.name }
          date={ props.date }
          campaignUrl={ props.campaignUrl }
          donateUrl={ props.donateUrl }
          getStartedUrl={ props.getStartedUrl }
          backgroundColor={ props.backgroundColor }
          backgroundImageUrl={ props.backgroundImageUrl }
          supporterCount={ props.supporterCount } />
      );
    });

    it('renders an anchor for campaignUrl', function() {
      var anchor = findByClass(element, 'Event__name').href;
      expect(anchor).toBe(props.campaignUrl);
    });

    it('renders an event name', function() {
      var subject = findByClass(element, 'Event__name').textContent;
      expect(subject).toContain(props.name);
    });

    it('renders an event date', function() {
      var subject = findByClass(element, 'Event__date').textContent;
      expect(subject).toContain('1');
      expect(subject).toContain('Jan');
      expect(subject).toContain('2015');
    });
  });

  describe('calls to action', function () {
    describe('when it is passed a donate url but isn\'t passed a get started URL', function() {
      var element;
      var props = {
        id: '1234',
        name: 'A Name',
        date: new Date('2015-01-01'),
        campaignUrl: 'http://google.com/',
        donateUrl: 'http://google.com/',
        getStartedUrl: '',
        backgroundColor: '#fc0',
        backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
        supporterCount: 50
      };

      beforeEach(function() {
        element = TestUtils.renderIntoDocument(
          <Event key={ props.id }
            name={ props.name }
            date={ props.date }
            campaignUrl={ props.campaignUrl }
            donateUrl={ props.donateUrl }
            getStartedUrl={ props.getStartedUrl }
            backgroundColor={ props.backgroundColor }
            backgroundImageUrl={ props.backgroundImageUrl }
            supporterCount={ props.supporterCount } />
        );
      });

      it('renders only one call to action', function() {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'CallToActionButton__label').length;
        expect(subject).toBe(1);
      });

      it('renders the donate call to action', function () {
        var subject = findByClass(element, 'CallToActionButton__label').textContent;
        expect(subject).toBe('Give Now');
      });
    });

    describe('when it isn\'t passed a donate url but is passed a get started URL', function() {
      var element;
      var props = {
        id: '1234',
        name: 'A Name',
        date: new Date('2015-01-01'),
        campaignUrl: 'http://google.com/',
        donateUrl: '',
        getStartedUrl: 'http://google.com/',
        backgroundColor: '#fc0',
        backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
        supporterCount: 50
      };

      beforeEach(function() {
        element = TestUtils.renderIntoDocument(
          <Event key={ props.id }
            name={ props.name }
            date={ props.date }
            campaignUrl={ props.campaignUrl }
            donateUrl={ props.donateUrl }
            getStartedUrl={ props.getStartedUrl }
            backgroundColor={ props.backgroundColor }
            backgroundImageUrl={ props.backgroundImageUrl }
            supporterCount={ props.supporterCount } />
        );
      });

      it('renders only one call to action', function() {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'CallToActionButton__label').length;
        expect(subject).toBe(1);
      });

      it('renders the get started call to action', function () {
        var subject = findByClass(element, 'CallToActionButton__label').textContent;
        expect(subject).toBe('Join Event');
      });
    });

    describe('when it is passed both a get started URL and a donate URL', function() {
      var element;
      var props = {
        id: '1234',
        name: 'A Name',
        date: new Date('2015-01-01'),
        campaignUrl: 'http://google.com/',
        donateUrl: 'http://google.com/',
        getStartedUrl: 'http://google.com/',
        backgroundColor: '#fc0',
        backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
        supporterCount: 50
      };

      beforeEach(function() {
        element = TestUtils.renderIntoDocument(
          <Event key={ props.id }
            name={ props.name }
            date={ props.date }
            campaignUrl={ props.campaignUrl }
            donateUrl={ props.donateUrl }
            getStartedUrl={ props.getStartedUrl }
            backgroundColor={ props.backgroundColor }
            backgroundImageUrl={ props.backgroundImageUrl }
            supporterCount={ props.supporterCount } />
        );
      });

      it('renders two calls to action', function() {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'Event__call-to-action').length;
        expect(subject).toBe(2);
      });

      it('renders the donate call to action', function () {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'CallToActionButton__label')[1].textContent;
        expect(subject).toBe('Give');
      });

      it('renders the join call to action', function () {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'CallToActionButton__label')[0].textContent;
        expect(subject).toBe('Join');
      });

      it('renders both call to action stats', function() {
        var subject = TestUtils.scryRenderedDOMComponentsWithClass(element, 'Event__call-to-action-stat').length;
        expect(subject).toBe(2);
      });
    });
  });
});
