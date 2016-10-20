import React from 'react'

export default React.createClass({
  displayName: 'TabPanel',
  propTypes: {
    content: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element,
      React.PropTypes.string
    ]).isRequired,
    index: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    panelId: React.PropTypes.string.isRequired,
    labelledBy: React.PropTypes.string.isRequired
  },

  createMarkup: function () {
    return { __html: this.props.content }
  },

  render: function () {
    var active = this.props.active ? ' TabPanel--active' : ''
    var props = {
      className: 'TabPanel' + active,
      role: 'tabpanel',
      'aria-labelledby': this.props.labelledBy
    }

    if (typeof this.props.content === 'object') {
      return <div {...props}>{ this.props.content }</div>
    }

    return <div {...props} dangerouslySetInnerHTML={this.createMarkup()} />
  }
})
