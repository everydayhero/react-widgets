'use strict';
jest.autoMockOff();

describe('FundraiserImage', function() {
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
      getStartedUrl: 'http://google.com/',
      backgroundColor: '#fc0',
      backgroundImageUrl: 'http://google.com/images/srpr/logo11w.png',
      supporterCount: 50
    };

    beforeEach(function() {
      var event = <Event key={ props.id }
                    name={ props.name }
                    date={ props.date }
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
      var anchor = findByTag(element, 'a').getDOMNode();
      expect(anchor.href).toBe(props.getStartedUrl);
    });

    it('renders an event name', function() {
      var thing = findByClass(element, 'Event__name');
      expect(thing.getDOMNode().textContent).toContain(props.name);
    });

    it('renders an event date', function() {
      var thing = findByClass(element, 'Event__date');
      expect(thing.getDOMNode().textContent).toContain('1');
      expect(thing.getDOMNode().textContent).toContain('Jan');
      expect(thing.getDOMNode().textContent).toContain('2015');
    });

    it('renders a supporter count', function() {
      var thing = findByClass(element, 'Event__supporter-count');
      expect(thing.getDOMNode().textContent).toContain('50');
      expect(thing.getDOMNode().textContent).toContain('Supporters');
    });

    it('renders an join event button', function() {
      var thing = findByClass(element, 'Event__join-event');
      expect(thing.getDOMNode().textContent).toContain('Join Event');
    });
  });
});
