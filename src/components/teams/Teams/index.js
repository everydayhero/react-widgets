"use strict";

var _         = require('lodash');
var React     = require('react');
var I18nMixin = require('../../mixins/I18n');
var pages     = require('../../../api/pages');
var Icon      = require('../../helpers/Icon');
var Team      = require('../Team');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Teams",
  propTypes: {
    campaignUid: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    type: React.PropTypes.string,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: null,
      page: 1,
      pageSize: 12,
      type: 'team',
      backgroundColor: null,
      textColor: null,
      defaultI18n: {
        heading: 'Teams',
        emptyLabel: 'No teams to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      hasResults: false,
      pageResults: []
    };
  },

  componentWillMount: function() {
    this.loadPages();
  },

  loadPages: function() {
    this.setState({ isLoading: true });

    var props = this.props;
    pages.findByCampaign(props.campaignUid, props.type, props.pageSize, props.page, this.onSuccess);
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      pageResults: result.pages
    },

    function() {
      if (!_.isEmpty(this.state.pageResults)) {
        this.setState({ hasResults: true });
      }
    }.bind(this));
  },

  renderTeam: function() {
    var emptyLabel = this.t('emptyLabel');

    if (this.state.isLoading) {
      return <Icon className="Teams__loading" icon="refresh" />;
    }

    if (this.state.hasResults) {
      return this.state.pageResults.map(function(d) {
        return (
          <Team key={ d.id } pageUrl={ d.url } imgSrc={ d.image.large_image_url } title={ d.name } />
        );
      });
    }

    return <p className="Teams__empty-label">{ emptyLabel }</p>;
  },

  render: function() {
    var heading = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="Teams" style={ customStyle }>
        <h3 className="Teams__heading">{ heading }</h3>
        <div className="Teams__content">
          { this.renderTeam() }
        </div>
      </div>
    );
  }
});
