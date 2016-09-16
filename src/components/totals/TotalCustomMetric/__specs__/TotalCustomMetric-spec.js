'use strict';

const React = require('react');
const enzyme = require('enzyme');
const jsdom = require('jsdom');
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('TotalCustomMetric', () => {
  const spy = sinon.spy();
  const TotalCustomMetric = mockrequire('../', {
    '../../../api/campaigns': {
      find: spy
    }
  });

  beforeEach(() => {
    spy.reset();
  });

  const defaultElement = <TotalCustomMetric campaignUid="au-123" i18n={{title: 'Units'}} />;

  describe('default props', () => {
    const mountedElement = enzyme.mount(defaultElement);

    it('has an offset of 0', () => {
      expect(mountedElement.props().offset).to.equal(0);
    });

    it('has icon rendering enabled, and set to bar-chart', () => {
      expect(mountedElement.props().renderIcon).to.equal(true);
      expect(mountedElement.props().icon).to.equal('bar-chart');
    });

    it('has no colors specified', () => {
      expect(mountedElement.props().backgroundColor).to.equal('');
      expect(mountedElement.props().textColor).to.equal('');
    });

    it('defaults to the \'0,0\' number format', () => {
      expect(mountedElement.props().format).to.equal('0,0');
    });
  });

  describe('API call', () => {
    it('makes a call containing the campaign UID', () => {
      enzyme.mount(defaultElement);
      expect(spy).to.have.been.calledWith(
        'au-123'
      );
    });
  });
});
