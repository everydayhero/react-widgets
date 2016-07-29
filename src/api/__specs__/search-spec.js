'use strict';

describe('search', () => {
  const spy = sinon.spy()
  const search = mockrequire('../search', {
    '../lib/getJSONP': spy
  })

  afterEach(() => {
    spy.reset();
  });

  describe('aggregate', () => {
    it('searches for everything', () => {
      const query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7, minimumScore: 0.05 };
      const callback = () => {};
      search.aggregate(query, callback);

      assert.calledWith(
        spy,
        'https://everydayhero.com/api/v2/search/aggregate.jsonp' +
          '?q=bar&country_code=xy&page=2&page_size=7&minimum_score=0.05',
        callback, { timeout: 10000 }
      )
    });
  });
});
