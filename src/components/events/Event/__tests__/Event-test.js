'use strict';
jest.autoMockOff();

describe('Event', function() {
  var React       = require('react/addons');
  var Event       = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var element;
    var props = {
      id: '1234',
      name: 'A Name',
      date: new Date('2015-01-01'),
      campaignUrl: 'http://google.com/',
      getStartedUrl: 'http://google.com/',
      backgroundColor: '#fc0',
      backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
      supporterCount: 50
    };

    beforeEach(function() {
      var event = <Event key={ props.id }
                    name={ props.name }
                    date={ props.date }
                    campaignUrl={ props.campaignUrl }
                    getStartedUrl={ props.getStartedUrl }
                    backgroundColor={ props.backgroundColor }
                    backgroundImageUrl={ props.backgroundImageUrl }
                    supporterCount={ props.supporterCount } />;
      element = TestUtils.renderIntoDocument(event);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders an anchor for getStartedUrl', function() {
      var anchor = findByClass(element, 'Event__join-event').getDOMNode().href;
      expect(anchor).toBe(props.getStartedUrl);
    });

    it('renders an anchor for campaignUrl', function() {
      var anchor = findByClass(element, 'Event__name').getDOMNode().href;
      expect(anchor).toBe(props.campaignUrl);
    });

    it('renders an event name', function() {
      var thing = findByClass(element, 'Event__name').getDOMNode().textContent;
      expect(thing).toContain(props.name);
    });

    it('renders an event date', function() {
      var thing = findByClass(element, 'Event__date').getDOMNode().textContent;
      expect(thing).toContain('1');
      expect(thing).toContain('Jan');
      expect(thing).toContain('2015');
    });

    it('renders a supporter count', function() {
      var thing = findByClass(element, 'Event__supporter-count').getDOMNode().textContent;
      expect(thing).toContain('50');
      expect(thing).toContain('Supporters');
    });

    it('renders an join event button', function() {
      var thing = findByClass(element, 'Event__join-event').getDOMNode().textContent;
      expect(thing).toContain('Join Event');
    });
  });
});
