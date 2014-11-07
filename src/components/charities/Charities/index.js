/** @jsx React.DOM */
"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var charities         = require('../../../api/charities');
var Icon              = require('../../helpers/Icon');
var TabsContainer     = require('../../helpers/TabsContainer');
var Charity           = require('../Charity');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Charities",
  propTypes: {
    tabs: React.PropTypes.array.isRequired,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      tabs: [],
      backgroundColor: '#EBEBEB',
      textColor: '#333333',
      defaultI18n: {
        heading: 'Promoted Charities',
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

    /**
     *  TODO: Make sure objects are returned in the
     *        order in which they are passed.
     *
     *
     *  TODO: Raise issue to have a way to bundle
     *        multiple charity ids in to one request.
     *
     *
     *  TODO: Raise issue regarding missing.gif image
     *        requests coming back as 403's.
     */

    this.setState({
      isLoading: true
    });

    var tabs        = this.props.tabs;
    var tabLength   = 0;
    var charityData = [];

    _.each(tabs, function(tab, i) {
      tabLength += tabs[i].charityUids.length;
    });

    var done = _.after(tabLength, function() {
      this.onSuccess(charityData);
    }).bind(this);

    // Nested loop feels icky
    _.each(tabs, function(tab) {
      _.each(tab.charityUids, function(charityUid) {
        charities.find(charityUid, function(result) {

          charityData.push(
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
      return <Icon className="Charities__loading" icon="refresh" spin={ true }/>;
    }

    if (this.state.hasResults) {
      return this.state.results.map(function(d) {
        return <Charity key={ d.id } url={ d.url } logo_url={ d.logo_url } name={ d.name } description={ d.description } />;
      });
    }

    return (
      <p className="Charities__empty-label">{ emptyLabel }</p>
    );

  },


  render: function() {
    var heading = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };



    var tabModel = [];

    this.state.results.map(function(d) {
      tabModel.push({
        tabLabel: d.category,
        tabContent: d.id
      });
    });

    console.log(tabModel);





    return (
      <div className="Charities" style={ customStyle }>
        <h3 className="Charities__heading">{ heading }</h3>
        <div className="Charities__content">
          { this.renderCharity() }

          // TODO: Get this shit working
          <TabsContainer labels={ this.props.tabLabels } contents={ this.props.tabContents } />

        </div>
      </div>
    );
  }
});
