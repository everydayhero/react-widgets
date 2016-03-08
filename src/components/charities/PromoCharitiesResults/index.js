'use strict';

var React                = require('react');
var Icon                 = require('../../helpers/Icon');
var PromoCharitiesResult = require('../PromoCharitiesResult');

module.exports = React.createClass({
  displayName: 'PromoCharitiesResults',
  propTypes: {
    loaded: React.PropTypes.bool,
    actionLabel: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    fetchUrl: React.PropTypes.func,
    content: React.PropTypes.arrayOf(React.PropTypes.object),
    showCharities: React.PropTypes.bool
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
            showCharity={ this.props.showCharities }
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
