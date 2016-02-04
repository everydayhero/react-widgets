"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('CallToActionBox', function() {
  var React                       = require('react');
  var CallToActionBox             = require('../');
  var campaigns                   = require('../../../../api/campaigns');
  var TestUtils                   = require('react-addons-test-utils');
  var findByClass                 = TestUtils.findRenderedDOMComponentWithClass;

  describe('component defaults', function() {
    var callToActionBox;
    var element;

    beforeEach(function() {
      callToActionBox = <CallToActionBox campaignUid="au-0" registrationUrl="http://google.com.au/" />;
      element = TestUtils.renderIntoDocument(callToActionBox);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders a loading icon', function() {
      element.setState({ isLoading: true });
      findByClass(element, 'CallToActionBox__loading');
    });

    it('renders a default title', function() {
      element.setState({ isLoading: false });
      var heading = findByClass(element, 'CallToActionBox__title');

      expect(heading.textContent).toBe('Get Involved');
    });

    it('renders default sign in link text', function() {
      element.setState({ isLoading: false });
      var link = findByClass(element, 'CallToActionBox__link');

      expect(link.textContent).toBe('Sign in');
    });

    it('renders if handed default campaign id', function() {
      expect(campaigns.find).toBeCalledWith('au-0', element.onSuccess);
    });
  });

  describe('component props', function() {
    var callToActionBox;
    var element;
    var translation = {
      title: 'Get on with it',
      signInLabel: 'login'
    };

    beforeEach(function() {
      callToActionBox = <CallToActionBox i18n={ translation } />;
      element = TestUtils.renderIntoDocument(callToActionBox);
    });

    it('renders a custom heading', function() {
      element.setState({isLoading: false});
      var title = findByClass(element, 'CallToActionBox__title');

      expect(title.textContent).toBe(translation.title);
    });

    it('renders a custom heading', function() {
      element.setState({isLoading: false});
      var signInLabel = findByClass(element, 'CallToActionBox__link');

      expect(signInLabel.textContent).toBe(translation.signInLabel);
    });
  });
});
