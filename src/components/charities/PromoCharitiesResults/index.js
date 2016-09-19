import React from 'react';
import Icon from '../../helpers/Icon';
import PromoCharitiesResult from '../PromoCharitiesResult';

export default React.createClass({
  displayName: 'PromoCharitiesResults',
  propTypes: {
    loaded: React.PropTypes.bool,
    actionLabel: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    fetchUrl: React.PropTypes.func,
    content: React.PropTypes.arrayOf(React.PropTypes.object),
    showCharityTitle: React.PropTypes.bool
  },

  renderCharityResults: function() {
    if (this.props.loaded) {
      return this.props.content.map(function(d) {
        return (
          <PromoCharitiesResult
            key={ d.id }
            result={ d }
            onSelect={ this.props.onSelect }
            actionLabel={ this.props.actionLabel }
            showCharityTitle={ this.props.showCharityTitle }
            url={ this.props.fetchUrl(d) } />
        );
      }, this);
    }

    return <Icon className="PromoCharitiesResults__loading" icon="refresh" />;
  },

  render: function() {
    return (
      <div className="PromoCharitiesResults">
        { this.renderCharityResults() }
      </div>
    );
  }
});
