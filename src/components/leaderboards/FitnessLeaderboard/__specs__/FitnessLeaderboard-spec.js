import React from 'react';
import { mount } from 'enzyme';

import FitnessLeaderboard from '../';
import campaigns from  '../../../../api/campaigns';

describe('FitnessLeaderboard', () => {
  beforeEach(() => {
    sinon.stub(campaigns, 'leaderboard')
  });

  afterEach(() => {
    campaigns.leaderboard.restore();
  });

  describe('fitness activity aggregation', () => {
    const distances = {
      gym: {
        distance_in_meters: 1,
      },
      run: {
        distance_in_meters: 1000,
      },
      sport: {
        distance_in_meters: 3000,
      }
    };

    it('aggregates all three metrics', () => {
      const mountedElement = mount(<FitnessLeaderboard campaignUid="au-123" />);
      const totalDistance = mountedElement.instance().combineActivityData(distances);
      expect(mountedElement.props().fitnessTypes.length).to.equal(3);
      expect(totalDistance).to.equal(4001);
    });

    it('aggregates a selected subset of metrics', () => {
      const mountedElement = mount(<FitnessLeaderboard campaignUid="au-123" fitnessTypes={['gym', 'sport']} />);
      const totalDistance = mountedElement.instance().combineActivityData(distances);
      expect(mountedElement.props().fitnessTypes.length).to.equal(2);
      expect(totalDistance).to.equal(3001);
    });

    it('returns 0 when fitnessTypes is explicitly empty', () => {
      const mountedElement = mount(<FitnessLeaderboard campaignUid="au-123" fitnessTypes={[]} />);
      const totalDistance = mountedElement.instance().combineActivityData(distances);
      expect(mountedElement.props().fitnessTypes.length).to.equal(0);
      expect(totalDistance).to.equal(0);
    });
  });
});

