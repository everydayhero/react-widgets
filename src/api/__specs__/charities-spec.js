import _ from 'lodash';
import charities from '../charities';
import * as getJSONP from '../../lib/getJSONP';

describe('charities', () => {
  let callback;
  const data = {
    au: { country_code: 'au', uid: 'au-123', slug: 'bar' },
    ie: { country_code: 'ie', uid: 'ie-123', slug: 'bar' },
    nz: { country_code: 'nz', uid: 'nz-123', slug: 'bar' },
    uk: { country_code: 'uk', uid: 'gb-123', slug: 'bar' },
    us: { country_code: 'us', uid: 'us-123', slug: 'bar' },
  };

  beforeEach(() => {
    callback = sinon.spy();
    sinon.stub(getJSONP, 'default');
  });

  afterEach(() => {
    getJSONP.default.restore();
  });

  describe('find', () => {
    it('gets a charity by uid', () => {
      charities.find('xy-12', callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/charities/xy-12.jsonp',
        callback
      );
    });
  });

  describe('findBySlug', () => {
    it('gets a charity by country and slug', () => {
      charities.findBySlug('xy', 'slugs-for-pugs', callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/charities/xy/slugs-for-pugs.jsonp',
        callback
      );
    });
  });

  describe('findByUids', () => {
    it('gets charities by uid', () => {
      charities.findByUids(['xy-123', 'xy-456'], callback);

      expect(getJSONP.default.args[0][0]).to.include('https://everydayhero.com/api/v2/charities.jsonp?ids=xy-123,xy-456');
    });

    describe('with empty array', () => {
      before(() => {
        sinon.stub(_, "defer", () => {});
      });

      beforeEach(() => {
        charities.findByUids([], callback);
      });

      after(() => {
        _.defer.restore();
      });

      it('does not fetch', () => {
        getJSONP.default.should.have.callCount(0);
      });

      it('defers callback with empty results', () => {
        expect(_.defer).to.have.been.calledWith(
          callback,
          { charities: [] }
        );
      });
    });
  });

  describe('findByCampaign', () => {
    it('gets charities by campaign uid', () => {
      charities.findByCampaign('xy-12', 7, 2, callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/charities.jsonp?campaign_ids=xy-12&page=2&limit=7',
        callback
      );
    });
  });

  describe('leaderboard', () => {
    it('gets charity leaderboard by charity uid', () => {
      charities.leaderboard('xy-123', 'foo', 12, callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/charities/xy-123/leaderboard.jsonp?type=foo&limit=12',
        callback
      );
    });

    it('accepts options', () => {
      charities.leaderboard('xy-123', 'foo', 12, callback, {
        includePages: true,
        includeFootprint: true
      });

      expect(getJSONP.default.args[0][0]).to.include('&include_pages=true');
      expect(getJSONP.default.args[0][0]).to.include('&include_footprint=true');
    });
  });

  describe('leaderboardBySlug', () => {
    it('gets charity leaderboard by country and slug', () => {
      charities.leaderboardBySlug('xy', 'slugs-for-pugs', 'foo', 12, callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/charities/xy/slugs-for-pugs/leaderboard.jsonp?type=foo&limit=12',
        callback
      );
    });

    it('accepts options', () => {
      charities.leaderboardBySlug('xy', 'slugs-for-pugs', 'foo', 12, callback, {
        includePages: true,
        includeFootprint: true
      });

      expect(getJSONP.default.args[0][0]).to.include('&include_pages=true');
      expect(getJSONP.default.args[0][0]).to.include('&include_footprint=true');
    });
  });

  describe('search', () => {
    it('searches for charities', () => {
      const query = { searchTerm: 'bar', country: 'xy', campaignUid: [12, 42], page: 2, pageSize: 7 };
      charities.search(query, callback);

      expect(getJSONP.default).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/search/charities.jsonp?q=bar&country_code=xy&campaign_id=12,42&page=2&page_size=7',
        callback,
        { timeout: 10000 }
      );
    });
  });

  describe('donateUrl', () => {
    it('defaults to give campaign', () => {
      expect(charities.donateUrl(data.au))
        .to.equal('https://give.everydayhero.com/au/bar/donate');
    });

    it('accepts campaign slug', () => {
      expect(charities.donateUrl(data.nz, 'foo'))
        .to.equal('https://foo.everydayhero.com/nz/bar/donate');
    });
  });

  describe('fundraiseUrl', () => {
    it('defaults to give campaign', () => {
      expect(charities.fundraiseUrl(data.uk))
        .to.equal('https://give.everydayhero.com/uk/bar/get-started');
    });

    it('accepts campaign slug', () => {
      expect(charities.fundraiseUrl(data.us, 'foo'))
        .to.equal('https://foo.everydayhero.com/us/bar/get-started');
    });
  });
});
