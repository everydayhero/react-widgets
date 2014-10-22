/** @jsx React.DOM */
"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var staticPages       = require('../../../api/staticPages');
var Icon              = require('../../helpers/Icon');
var Team              = require('../Team');
var numeral           = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Teams",
  propTypes: {
    campaignUid: React.PropTypes.string,
    type: React.PropTypes.string,
    limit: React.PropTypes.string,
    page: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      type: 'team',
      limit: '12',
      page: '1',
      defaultI18n: {
        heading: 'All Teams'
      }
    }
  },

  getInitialState: function() {
    return {
      isLoading: false,
      pageResults: [],
      hasResults: false
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    staticPages.find(props.campaignUid, props.type, props.limit, props.page, this.onSuccess);
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      pageResults: result.pages
    });

    if (!_.isEmpty(this.state.pageResults)) {
      this.setState({
        hasResults: true
      });
    }
  },

  renderTeam: function() {
    var emptyLabel = this.t('emptyLabel');

    if (this.state.isLoading) {
      return <Icon className="Teams__loading" icon="refresh" spin={ true }/>;
    } else {
      if (this.state.hasResults) {
        return this.state.pageResults.map(function(d,i) {
          return (
            <Team pageUrl={ d.url } imgSrc="http://placehold.it/150x80" title={ d.name } />
          )
        });
      } else {
        return (
          <p className="Teams__empty-label">{ emptyLabel }</p>
        )
      }
    }
  },

  render: function() {
    var heading = this.t('heading');

    return (
      <div className="Teams">
        <h3 className="Teams__heading">{ heading }</h3>
        <div className="Teams__content">
          { this.renderTeam() }
        </div>
      </div>
    )
  }
});
