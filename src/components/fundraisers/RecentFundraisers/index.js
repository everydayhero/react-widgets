import _ from 'lodash';
import React from 'react';
import I18nMixin from '../../mixins/I18n';
import pages from '../../../api/pages';
import Icon from '../../helpers/Icon';
import FundraiserImage from '../FundraiserImage';

export default React.createClass({
  mixins: [I18nMixin],
  displayName: 'RecentFundraisers',
  propTypes: {
    campaignUid: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: null,
      page: 1,
      pageSize: 6,
      type: 'individual',
      backgroundColor: null,
      textColor: null,
      defaultI18n: {
        heading: 'Fundraisers',
        emptyLabel: 'No fundraisers to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
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
    });
  },

  renderFundraiserImage: function() {
    if (this.state.isLoading) {
      return <Icon className="RecentFundraisers__loading" icon="refresh" />;
    } else {
      return this.state.pageResults.map(function(d) {
        return (<FundraiserImage
          key={ d.id }
          pageUrl={ d.url }
          imgSrc={ d.image.large_image_url }
          imgTitle={ d.name } />);
      });
    }
  },

  render: function() {
    var fundraisers = this.renderFundraiserImage();
    var heading = this.t('heading');
    var style = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="RecentFundraisers" style={ style }>
        <h3 className="RecentFundraisers__heading">{ heading }</h3>
        <div className="RecentFundraisers__content">
          { !_.isEmpty(fundraisers) ? fundraisers : <p className="RecentFundraisers__empty-label">{ this.t('emptyLabel') }</p>
          }
        </div>
      </div>
    );
  }
});
