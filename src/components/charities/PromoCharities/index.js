"use strict";

var _                  = require('lodash');
var React              = require('react');
var I18nMixin          = require('../../mixins/I18n');
var charities          = require('../../../api/charities');
var PromoCharitiesTabs = require('../PromoCharitiesTabs');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "PromoCharities",
  propTypes: {
    action: React.PropTypes.oneOf(['donate', 'fundraise', 'custom']).isRequired,
    tabs: React.PropTypes.array.isRequired,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      tabs: [],
      defaultI18n: {
        heading: 'Promoted Charities',
        subheading: 'Choose a tab below to view promoted charities within each category.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoaded: false,
      isLoading: false,
      results: []
    };
  },

  componentWillMount: function() {
    var tabs = _.map(this.props.tabs, function(tab, tabIndex) {
      var data = {
        isLoading: true,
        tabName: tab.category,
        contents: []
      };

      charities.findByUids(tab.charityUids, function(responses) {
        this.tabLoaded(tabIndex, responses.charities);
      }.bind(this));

      return data;
    }, this);

    this.setState({
      isLoading: true,
      tabs: tabs
    });
  },

  tabLoaded: function(tabIndex, charities) {
    var tabs = this.state.tabs;
    var tab  = tabs[tabIndex];

    tab.isLoaded = true;
    tab.contents = charities;

    this.setState({
      isLoaded: _.every(tabs, 'isLoaded'),
      tabs: tabs
    });
  },

  selectHandler: function(charity) {
    if (this.props.action == 'custom') {
      this.props.onSelect(charity);
    } else {
      var redirect = charities[this.props.action + 'Url'](charity, this.props.campaignSlug);
      document.location = redirect;
    }
  },

  render: function() {
    var heading    = this.t('heading');
    var subheading = this.t('subheading');
    var emptyLabel = this.t('emptyLabel');

    var renderSubheading = function() {
      if (subheading) {
        return <p className="PromoCharities__subheading">{ subheading }</p>;
      }
    };

    return (
      <div className="PromoCharities">
        <div className="PromoCharities__head">
          <h3 className="PromoCharities__heading">{ heading }</h3>
          { renderSubheading() }
        </div>
        <div className="PromoCharities__content">
          <PromoCharitiesTabs
            data={ this.state.tabs }
            loaded={ this.state.isLoaded }
            onSelect={ this.selectHandler } />
        </div>
      </div>
    );
  }
});
