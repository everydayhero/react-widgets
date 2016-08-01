'use strict';

const spy = sinon.spy();
const callback = () => {};

describe('pages', () => {
  const pages = mockrequire('../pages', {
    '../lib/getJSONP': spy
  });

  afterEach(() => {
    spy.reset();
  });

  describe('find', () => {
    it('gets a page by id', () => {
      pages.find('123', callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/pages/123.jsonp',
        callback
      );
    });

    it('accepts options', () => {
      pages.find('123', callback, { includeFootprint: true });

      expect(spy.args[0][0]).to.include('include_footprint=true');
    });
  });

  describe('findByIds', () => {
    it('gets pages by ids', () => {
      pages.findByIds(['123', '456'], callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/pages.jsonp?ids=123,456',
        callback
      );
    });

    it('accepts options', () => {
      pages.findByIds(['123', '456'], callback, { includeFootprint: true });

      expect(spy.args[0][0]).to.include('&include_footprint=true');
    });
  });

  describe('findByCampaign', () => {
    it('gets pages by campaign uid and type', () => {
      pages.findByCampaign('xy-12', 'foo', 7, 2, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/pages.jsonp?campaign_id=xy-12&type=foo&page=2&limit=7',
        callback
      );
    });

    it('accepts options', () => {
      pages.findByCampaign('xy-12', 'foo', 7, 2, callback, { includeFootprint: true });

      expect(spy.args[0][0]).to.include('&include_footprint=true');
    });
  });

  describe('findByCharity', () => {
    it('gets total from charity id', () => {
      pages.findByCharity('au-24', 'foo', 7, 2, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/pages.jsonp?charity_ids=au-24&type=foo&page=2&limit=7',
        callback
      );
    });
  });

  describe('search', () => {
    it('searches for pages', () => {
      const query = {
        searchTerm: 'bar',
        country: 'xy',
        campaignUid: ['xy-12', 'xy-42'],
        charityUid: 'xy-123',
        groupValue: ['ABC', 'DEF'],
        pageType: 'foo',
        page: 2,
        pageSize: 7
      };
      pages.search(query, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/pages.jsonp' +
          '?q=bar&country_code=xy&campaign_id[]=xy-12&campaign_id[]=xy-42&charity_id[]=xy-123&group_value[]=ABC&group_value[]=DEF&type=foo&page=2&page_size=7',
        callback,
        { timeout: 10000 }
      );
    });
  });

  describe('isGivePage', () => {
    it('tests if page belongs to give campaign', () => {
      expect(pages.isGivePage({ campaign: { uid: 'au-0' }, country_code: 'au' })).to.be.true;
      expect(pages.isGivePage({ campaign: { uid: 'au-1' }, country_code: 'au' })).to.be.false;
    });
  });
});
