"use strict";
jest.autoMockOff();
jest.mock('../../../../api/charities');

describe('LeaderboardPaging', function() {
  var React              = require('react/addons');
  var LeaderboardPaging  = require('../');
  var TestUtils          = React.addons.TestUtils;
  var findByClass        = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass        = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('LeaderboardPaging', function() {
    var leaderboardPaging;
    var component;
    var nextButton;
    var prevButton;
    var callback = jest.genMockFunction();

    describe('paging defaults', function() {
      beforeEach(function() {
        leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 1 } pageCount={ 4 } />;

        component  = TestUtils.renderIntoDocument(leaderboardPaging);
        nextButton = findByClass(component, 'LeaderboardPaging__nextBtn').getDOMNode();
        prevButton = findByClass(component, 'LeaderboardPaging__prevBtn').getDOMNode();
      });

      it('renders a component', function() {
        expect(component).not.toBeNull();
      });

      it('displays a right pointing caret for on the next button', function() {
        var nextIcon = findByClass(component, 'fa-caret-right').getDOMNode();
        expect(nextIcon).not.toBeNull();
      });

      it('triggers a callback when the next button is clicked', function() {
        expect(nextButton).not.toBeNull();
        TestUtils.Simulate.click(nextButton);
        expect(callback).toBeCalled();
      });

      it('triggers a callback when the prev button is clicked', function() {
        expect(prevButton).not.toBeNull();
        TestUtils.Simulate.click(prevButton);
        expect(callback).toBeCalled();
      });
    });

    describe('previous button states', function() {
      it('has no active modifier class by default', function() {
        var leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 1 } pageCount={ 4 } />;

        var component  = TestUtils.renderIntoDocument(leaderboardPaging);
        var prevButton = findByClass(component, 'LeaderboardPaging__prevBtn').getDOMNode();

        expect(prevButton.className).not.toContain('LeaderboardPaging__prevBtn--active');
      });

      it('has a active modifier class if not on the first page', function() {
        var leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 2 } pageCount={ 4 } />;

        var component  = TestUtils.renderIntoDocument(leaderboardPaging);
        var prevButton = findByClass(component, 'LeaderboardPaging__prevBtn').getDOMNode();

        expect(prevButton.className).toContain('LeaderboardPaging__prevBtn--active');
      });
    });

    describe('next button states', function() {
      it('has an active modifier class by default', function() {
        var leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 1 } pageCount={ 4 } />;

        var component  = TestUtils.renderIntoDocument(leaderboardPaging);
        var nextButton = findByClass(component, 'LeaderboardPaging__nextBtn').getDOMNode();

        expect(nextButton.className).toContain('LeaderboardPaging__nextBtn--active');
      });

      it('has the active modifier class removed if on the last page', function() {
        var leaderboardPaging = <LeaderboardPaging nextPage={ callback } prevPage={ callback } currentPage={ 4 } pageCount={ 4 } />;

        var component  = TestUtils.renderIntoDocument(leaderboardPaging);
        var nextButton = findByClass(component, 'LeaderboardPaging__nextBtn').getDOMNode();

        expect(nextButton.className).not.toContain('LeaderboardPaging__nextBtn--active');
      });
    });
  });
});
