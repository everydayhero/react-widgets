import _ from 'lodash';
import React from 'react';

export default React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    fixedWidth: React.PropTypes.bool,
    spin: React.PropTypes.bool,
    type: React.PropTypes.string,
  },

  render() {
    let spin = this.props.icon === 'circle-o-notch' || this.props.icon === 'spinner' || this.props.icon === 'refresh' || this.props.spin;
    let classes = _.compact([
      'Icon',
      this.props.type && ('Icon--' + this.props.type),
      'fa',
      this.props.fixedWidth && 'fa-fw',
      spin && 'fa-spin',
      'fa-' + (this.props.icon || 'rocket')
    ]).join(' ');

    let wrapperClasses = _.compact(['IconWrapper', this.props.className]).join(' ');
    return (
      <span className={ wrapperClasses }><i className={classes} /></span>
    );
  }
});
