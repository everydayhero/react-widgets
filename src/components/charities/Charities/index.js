/** @jsx React.DOM */
"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var charities         = require('../../../api/charities');
var Icon              = require('../../helpers/Icon');
var Charity           = require('../Charity');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Charities",
  propTypes: {
    charityUids: React.PropTypes.array.isRequired,
    page_count: React.PropTypes.string,
    page_size: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      charityUids: [],
      page_count: '1',
      page_size: '6',
      type: 'user',
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
    this.setState({
      isLoading: true
    });

    var charityUids = this.props.charityUids;
    var charityData = [];

    /**
     *  TODO: Raise issue to have a way to bundle
     *        multiple charity ids in to one request.
     */

    var done = _.after(charityUids.length, function() {
      this.onSuccess(charityData);
    }).bind(this);

    _.each(charityUids, function(charityUid) {
      charities.find(charityUid, function(result) {

        charityData.push(
          {
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
      return <Icon className="Charity__loading" icon="refresh" spin={ true }/>;
    }

    if (this.state.hasResults) {
      return this.state.results.map(function(d) {
        return <Charity
                  key={ d.id }
                  url={ d.url }
                  logo_url={ d.logo_url }
                  name={ d.name }
                  description={ d.description } />
      });
    }

    return (
      <p className="Charity__empty-label">{ emptyLabel }</p>
    );

  },

  render: function() {
    var heading = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="Charity" style={ customStyle }>
        <h3 className="Charity__heading">{ heading }</h3>
        <div className="Charity__content">
          { this.renderCharity() }
        </div>
      </div>
    )
  }
});
