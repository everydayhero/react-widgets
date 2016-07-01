'use strict';

describe('address', () => {
  const spy = sinon.spy()
  const address = mockrequire('../address', {
    '../lib/getJSONP': spy
  })
  const callback = () => {};

  afterEach(() => {
    spy.reset();
  })

  describe('find', () => {
    it('gets an address by id', () => {
      address.find('123', 'uk', callback);

      assert.calledWithExactly(
        spy,
        'https://everydayhero.com/api/v2/addresses/uk/123.jsonp',
        callback
      )
    });
  });

  describe('search', () => {
    it('searches for addresses', () => {
      address.search('blah', 'uk', callback);

      assert.calledWithExactly(
        spy,
        'https://everydayhero.com/api/v2/addresses.jsonp?country_code=uk&q=blah',
        callback
      )
    });
  });
});
