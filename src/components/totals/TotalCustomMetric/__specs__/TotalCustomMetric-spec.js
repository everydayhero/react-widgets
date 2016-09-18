import React from 'react';
import { mount } from 'enzyme';
import jsdom from 'jsdom';

import TotalCustomMetric from '../';
import campaigns from  '../../../../api/campaigns';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('TotalCustomMetric', () => {
  beforeEach(() => {
    sinon.stub(campaigns, 'find');
  });

  afterEach(() => {
    campaigns.find.restore();
  });

  const defaultElement = <TotalCustomMetric campaignUid="au-123" i18n={{title: 'Units'}} />;

  describe('default props', () => {
    const mountedElement = mount(defaultElement);

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
      mount(defaultElement);
      expect(campaigns.find).to.have.been.calledWith(
        'au-123'
      );
    });
  });
});
