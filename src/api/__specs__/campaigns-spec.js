'use strict';

describe('campaigns', () => {
  const spy = sinon.spy()
  const campaigns = mockrequire('../campaigns', {
    '../lib/getJSONP': spy
  })
  const callback = sinon.spy();

  afterEach(() => {
    spy.reset();
    callback.reset();
  })

  describe('find', () => {
    it('gets a campaign by uid', () => {
      campaigns.find('xy-12', callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns/xy-12.jsonp',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.find('xy-12', callback, {
        excludeCharities: true,
        excludePages: true
      });

      expect(spy.args[0][0]).to.include('exclude_charities=true')
      expect(spy.args[0][0]).to.include('exclude_pages=true')
    });
  });

  describe('findBySlug', () => {
    it('gets a campaign by country and slug', () => {
      campaigns.findBySlug('xy', 'slugathon-2015', callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns/xy/slugathon-2015.jsonp',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.findBySlug('xy', 'slugathon-2015', callback, {
        excludeCharities: true,
        excludePages: true
      });

      expect(spy.args[0][0]).include('exclude_charities=true');
      expect(spy.args[0][0]).include('exclude_pages=true');
    });
  });

  describe('findByUids', () => {
    it('gets campaigns by uid', () => {
      campaigns.findByUids(['xy-123', 'xy-456'], callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns.jsonp?ids=xy-123,xy-456',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.findByUids(['xy-123', 'xy-456'], callback, {
        status: 'active',
        sortBy: 'finish_at',
        excludeCharities: true,
        excludePages: true,
        excludeBau: true
      });

      expect(spy.args[0][0]).include('status=active');
      expect(spy.args[0][0]).include('sort_by=finish_at');
      expect(spy.args[0][0]).include('exclude_charities=true');
      expect(spy.args[0][0]).include('exclude_pages=true');
      expect(spy.args[0][0]).include('exclude_bau=true');
    });

    describe('with empty array', () => {
      let _ = require('lodash');

      before(() => {
        sinon.stub(_, "defer", () => {});
      });

      beforeEach(() => {
        campaigns.findByUids([], callback);
      });

      after(() => {
        _.defer.restore();
      });

      it('does not fetch results', () => {
        spy.should.have.callCount(0);
      });

      it('defers callback with empty results', () => {
        spy.should.have.callCount(0);
        expect(_.defer).to.have.been.calledWith(
          callback,
          { campaigns: [] }
        );
      });
    });
  });

  describe('findByCharity', () => {
    it('gets campaigns that include the given charity uid', () => {
      campaigns.findByCharity('xy-123', 1, 10, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns.jsonp?charity_id=xy-123&page=1&limit=10',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.findByCharity('xy-123', 1, 10, callback, {
        status: 'active',
        sortBy: 'finish_at',
        excludeCharities: true,
        excludePages: true,
        excludeBau: true
      });

      expect(spy.args[0][0]).include('status=active');
      expect(spy.args[0][0]).include('sort_by=finish_at');
      expect(spy.args[0][0]).include('exclude_charities=true');
      expect(spy.args[0][0]).include('exclude_pages=true');
      expect(spy.args[0][0]).include('exclude_bau=true');
    });
  });

  describe('leaderboard', () => {
    it('gets campaign leaderboard by campaign uid', () => {
      campaigns.leaderboard('xy-123', 'abcd', 'foo', 12, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns/xy-123/leaderboard.jsonp?type=foo&limit=12&charity_ids=abcd',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.leaderboard('xy-123', 'abcd', 'foo', 12,  () => {}, {
        includePages: true,
        includeFootprint: true,
        groupValue: 'ABC&group_value[]=DEF'
      });

      expect(spy.args[0][0]).include('&include_pages=true');
      expect(spy.args[0][0]).include('&include_footprint=true');
      expect(spy.args[0][0]).include('&group_value[]=ABC&group_value[]=DEF');
    });
  });

  describe('leaderboardByUids', () => {
    it('gets multiple campaign leaderboards by campaign uids', () => {
      campaigns.leaderboardByUids(['ab-123', 'cd-456'], 'abcd', 'foo', 12, callback, {});

      expect(spy.args.length).to.equal(2);
      expect(spy.args[0][0]).include('ab-123');
      expect(spy.args[1][0]).include('cd-456');
    });
  });

  describe('leaderboardBySlug', () => {
    it('gets campaign leaderboard by country and slug', () => {
      campaigns.leaderboardBySlug('xy', 'slugathon-2015', 'foo', 12, callback);

      expect(spy).to.have.been.calledWith(
        'https://everydayhero.com/api/v2/campaigns/xy/slugathon-2015/leaderboard.jsonp?type=foo&limit=12',
        callback
      );
    });

    it('accepts options', () => {
      campaigns.leaderboardBySlug('xy', 'slugathon-2015', 'foo', 12, callback, {
        includePages: true,
        includeFootprint: true
      });

      expect(spy.args[0][0]).include('&include_pages=true');
      expect(spy.args[0][0]).include('&include_footprint=true');
    });
  });

  describe('search', () => {
    it('searches for campaigns', () => {
      const query = {
        searchTerm: 'bar',
        country: 'xy',
        page: 2,
        pageSize: 7,
        charityUuids: ['abc-123', 'xyz-456']
      };
      campaigns.search(query, callback);

      expect(spy.args[0][0]).to.equal('https://everydayhero.com/api/v2/search/campaigns.jsonp?q=bar&country_code=xy&page=2&page_size=7&charity_uuids=abc-123,xyz-456');
    });
  });

  describe('giveCampaignUid', () => {
    it('returns uid for give campaign', () => {
      expect(campaigns.giveCampaignUid('au')).to.equal('au-0');
      expect(campaigns.giveCampaignUid('ie')).to.equal('ie-0');
      expect(campaigns.giveCampaignUid('nz')).to.equal('nz-0');
      expect(campaigns.giveCampaignUid('uk')).to.equal('gb-0');
      expect(campaigns.giveCampaignUid('us')).to.equal('us-0');
      expect(campaigns.giveCampaignUid('xy')).to.equal(undefined);
    });
  });
});
