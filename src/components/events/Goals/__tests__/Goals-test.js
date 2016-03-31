'use strict';

jest.autoMockOff();
jest.mock('../../../../api/totals');
var totals = require('../../../../api/totals');
jest.mock('bluebird');
var Promise = require('bluebird');

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Goals = require('../');

describe('Goals', function() {
  describe('props.onData', function() {
    it('is called when campaign stats have been fetched', function() {
      Promise.all = jest.genMockFunction().mockImplementation(function () {
        return { then: function(cb) { cb() } }
      });

      var count = 2;
      totals.findByCampaigns = jest.genMockFunction().mockImplementation(function() {
        count++;
        return {
          then: function (cb) {
            cb({ total_amount_cents: { count } })
          }
        }
      })

      var expected = [
        { uid: 'au-1', count: 3 },
        { uid: 'au-2', count: 4 },
        { uid: 'au-3', count: 5 }
      ];
      var onData = jest.genMockFunction();

      ReactTestUtils.renderIntoDocument(
        <Goals
          campaignUids={['au-1', 'au-2', 'au-3']}
          onData={onData}
        />
      );

      expect(onData.mock.calls[0][0]).toEqual(expected);
    })
  })
})

