import React from 'react'
import cx from 'classnames'

export default React.createClass({
  displayName: 'FootprintTile',

  propTypes: {
    diameter: React.PropTypes.number.isRequired,
    compact: React.PropTypes.bool.isRequired,
    metric: React.PropTypes.object,
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired,
    offset: React.PropTypes.number.isRequired,
    onTouch: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  renderAvatar: function () {
    var avatarStyle = {
      backgroundImage: 'url(' + this.props.avatar + ')',
      borderWidth: this.props.offset
    }
    return (<a href={this.props.url}
      className='FootprintAvatar'
      title={this.props.name}
      style={avatarStyle}
      onClick={this.props.onClick} />)
  },

  renderData: function () {
    var diameter = this.props.diameter
    var isCompact = this.props.compact
    var metric = this.props.metric || {
      percentile: 0,
      value: '-',
      name: this.props.name
    }
    var dataStyle = isCompact ? null : {
      lineHeight: diameter * 0.9 + 'px',
      fontSize: diameter / 2 + 'px'
    }
    return (
      <div className='FootprintData' style={dataStyle} onTouchStart={this.props.onTouch}>
        { !isCompact && metric.percentile + '%' }

        { isCompact && <div className='FootprintData__value' style={{ fontSize: diameter / 5 + 'px' }}>{ metric.value }</div> }
        { isCompact && <div className='FootprintData__name' style={{ fontSize: diameter / 12 + 'px' }}>{ metric.name }</div> }
      </div>
    )
  },

  render: function () {
    var diameter = this.props.diameter
    var tileStyle = {
      width: diameter,
      height: diameter,
      marginLeft: -diameter / 2,
      marginTop: -diameter / 2
    }
    var tileClasses = cx({
      'FootprintTile': true,
      'FootprintTile--flip': !!this.props.metric
    })

    return (
      <div className={tileClasses} style={tileStyle}>
        { this.renderAvatar() }
        { this.renderData() }
      </div>
    )
  }
})
