import React from 'react';
import I18nMixin from '../../mixins/I18n';
import charities from '../../../api/charities';
import Icon from '../../helpers/Icon';
import numeral from 'numbro';

export default React.createClass({
  mixins: [I18nMixin],
  displayName: "TotalCharities",
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      campaignUid: '',
      campaignUids: [],
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0 a',
      defaultI18n: {
        title: 'Non Profits'
      }
    };
  },

  getInitialState() {
    return {
      isLoading: false,
      total: 0
    };
  },

  componentWillMount() {
    this.loadCharities();
  },

  setUids() {
    let campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  loadCharities() {
    this.setState({ isLoading: true });
    charities.findByCampaign(this.setUids(), 1, 1, this.onSuccess);
  },

  onSuccess(result) {
    this.setState({
      isLoading: false,
      total: result.meta.count
    });
  },

  renderTotal() {
    let totalCharities = this.state.total;
    let formattedTotal = numeral(totalCharities).format(this.props.format);
    let title = this.t('title');

    if (this.state.isLoading) {
      return <Icon className="TotalCharities__loading" icon="refresh" />;
    } else {
      return (
        <div>
          <div className="TotalCharities__total">{ formattedTotal }</div>
          <div className="TotalCharities__title">{ title }</div>
        </div>
      );
    }
  },

  renderIcon() {
    let renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = "heart";
    }

    if (renderIcon) {
      return <Icon className="TotalCharities__icon" icon={ renderIcon } />;
    }
  },

  render() {
    let customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "TotalCharities" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
