/** @jsx React.DOM */
"use strict";

var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var pages             = require('../../../api/pages');
var Icon              = require('../../helpers/Icon');
var FundraiserImage   = require('../FundraiserImage');
var numeral           = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "RecentFundraisers",
  propTypes: {
    campaignUid: React.PropTypes.string,
    page_count: React.PropTypes.string,
    page_size: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      page_count: '1',
      page_size: '6',
      renderIcon: true,
      defaultI18n: {
        heading: 'Fundraisers'
      }
    }
  },

  getInitialState: function() {
    return {
      isLoading: false,
      pageResults: [],
      imgUrl: ''
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    pages.find(props.campaignUid, props.page_count, props.page_size, this.onSuccess);
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      pageResults: result.pages
    });
  },

  renderFundraiserImage: function() {
    return this.state.pageResults.map(function(d,i) {
      return (
        <FundraiserImage pageUrl={ d.url } imgSrc={ d.image.large_image_url } imgTitle={ d.name } imgAlt={ d.name } />
      )
    });
  },

  render: function() {
    var heading = this.t('heading');

    return (
      <div className="RecentFundraisers">
        <h3 className="RecentFundraisers__heading">{ heading }</h3>
        <div className="RecentFundraisers__content">
          { this.renderFundraiserImage() }
        </div>
      </div>
    );
  }
});
