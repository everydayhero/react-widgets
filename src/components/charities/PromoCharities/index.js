/** @jsx React.DOM */
"use strict";

var _                  = require('lodash');
var React              = require('react');
var I18nMixin          = require('../../mixins/I18n');
var charities          = require('../../../api/charities');
var Icon               = require('../../helpers/Icon');
var PromoCharitiesTabs = require('../PromoCharitiesTabs');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "PromoCharities",
  propTypes: {
    tabs: React.PropTypes.array.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      tabs: [],
      defaultI18n: {
        heading: 'Promoted Charities',
        subheading: 'Choose a tab below to view promoted charities within each category.',
        emptyLabel: 'No charities to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      hasResults: false,
      results: []
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var tabs         = this.props.tabs;
    var tabLength    = 0;
    var charityData  = [];

    _.each(tabs, function(tab, i) {
      tabLength += tabs[i].charityUids.length;
    });

    var done = _.after(tabLength, function() {
      this.onSuccess(charityData);
    }).bind(this);

    _.each(tabs, function(tab, i) {

      charityData.push(
        {
          tabName: tab.category,
          contents: []
        }
      );

      _.each(tab.charityUids, function(charityUid) {
        charities.find(charityUid, function(result) {

          charityData[i].contents.push(
            {
              category:    tab.category,
              id:          result.charity.id,
              name:        result.charity.name,
              description: result.charity.description,
              url:         result.charity.url,
              logo_url:    result.charity.logo_url
            }
          );

          done();
        });
      });
    }, this);
  },

  onSuccess: function(data) {
    this.setState({
      isLoading: false,
      results: data
    },

    function() {
      if (!_.isEmpty(this.state.results)) {
        this.setState({
          hasResults: true
        });
      }
    }.bind(this));
  },

  renderCharity: function() {
    var emptyLabel = this.t('emptyLabel');

    if (this.state.isLoading) {
      return <Icon className="PromoCharities__loading" icon="refresh" spin={ true }/>;
    }

    if (this.state.hasResults) {
      return <PromoCharitiesTabs data={ this.state.results } />;
    }

    return <p className="PromoCharities__empty-label">{ emptyLabel }</p>;
  },

  render: function() {
    var heading = this.t('heading');
    var subheading = this.t('subheading');

    return (
      <div className="PromoCharities">
        <div className="PromoCharities__head">
          <h3 className="PromoCharities__heading">{ heading }</h3>
          <p className="PromoCharities__subheading">{ subheading }</p>
        </div>
        <div className="PromoCharities__content">
          { this.renderCharity() }
        </div>
      </div>
    );
  }
});
