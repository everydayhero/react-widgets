"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var DOMInfoMixin      = require('../../mixins/DOMInfo');
var pages             = require('../../../api/pages');
var Icon              = require('../../helpers/Icon');
var SupporterCard     = require('../SupporterCard');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

// DELETE THIS SHIT WHEN ENDPOINT EXISTS
function rand() { // for Footprint dummy data
  return (Math.random() * 100 | 0) + 1;
}

var dummyData = [
  {id:0, key:'community_raised', name:'Community Raised', group:'community', value:'$0.00', percentile:rand(), description: "The collective funds raised by people who care about the same causes as you."},
  {id:1, key:'community_engagement', name:'Community Engagement', group:'community', value:'467k', percentile:rand(), description: "The number of people supporting the causes you care about."},
  {id:2, key:'money_fundraising', name:'Fundraising', group:'money', value:'$4.8k', percentile:rand(), description: "The lifetime amount you have raised through fundraising for the causes you care about."},
  {id:3, key:'money_donations', name:'Donations', group:'money', value:'$9.8k', percentile:rand(), description: "The lifetime amount you have donated to the causes you care about."},
  {id:4, key:'voice_reach', name:'Reach', group:'voice', value:'4564', percentile:rand(), description: "How many people you have reached through your philanthropic activities and sharing."},
  {id:5, key:'voice_engagement', name:'Engagement', group:'voice', value:'36.8k', percentile:rand(), description: "How engaged you are with your supporters and other fundraisers."},
  {id:6, key:'effort_training', name:'Training', group:'effort', value:'64h', percentile:rand(), description: "The total duration you have trained in support of the causes you care about."},
  {id:7, key:'effort_volunteering', name:'Volunteering', group:'effort', value:'356h', percentile:rand(), description: "The total duration you have volunteered your talents for causes you care about."}
];
// DELETE THAT ^^^ SHIT WHEN ENDPOINT EXISTS

module.exports = React.createClass({
  displayName: "Supporters",

  mixins: [I18nMixin, DOMInfoMixin],

  propTypes: {
    campaignUid: React.PropTypes.string,
    page: React.PropTypes.string,
    pageSize: React.PropTypes.string,
    type: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      page: '1',
      pageSize: '6',
      type: 'individual',
      backgroundColor: '#EBEBEB',
      textColor: '#333333',
      defaultI18n: {
        heading: 'Supporters',
        emptyLabel: 'No supporters to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      cardWidth: '',
      supporters: []
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    pages.findByCampaign(props.campaignUid, props.type, props.pageSize, props.page, this.onSuccess);
  },

  componentDidMount: function() {
    addEventListener(window, 'resize', this.setCardWidth);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'resize', this.setCardWidth);
  },

  setCardWidth: _.debounce(function() {
    this.setState({
      cardWidth: this.getChildrenWidth(180, this.state.supporters.length)
    });
  }, 100),

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      supporters: result.pages,
      cardWidth: this.getChildrenWidth(180, result.pages.length)
    });
  },

  renderSupporterCards: function() {
    var state = this.state;
    var supporters = state.supporters;
    if (state.isLoading) {
      return <Icon className="Supporters__loading" icon="refresh" />;
    } else {
      return supporters.map(function(d) {
        return <SupporterCard
          key={ d.id }
          data={ dummyData }
          width={ state.cardWidth }
          url={ d.url }
          image={ d.image.large_image_url }
          name={ d.name }
          target={ d.target_cents / 100 }
          current={ d.amount.cents / 100 }
          currency={ d.amount.currency.symbol } />;
      });
    }
  },

  render: function() {
    var supporterCards = this.renderSupporterCards();
    var style = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="Supporters" style={ style }>
        <h3 className="Supporters__heading">{ this.t('heading') }</h3>
        <div className="Supporters__content">
          { !_.isEmpty(supporterCards) ? supporterCards : <p className="Supporters__emptyLabel">{ this.t('emptyLabel') }</p>
          }
        </div>
      </div>
    );
  }
});
