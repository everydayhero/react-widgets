import React from 'react'
import cx from 'classnames'

export default React.createClass({
  displayName: 'FootprintTip',

  propTypes: {
    metric: React.PropTypes.object.isRequired,
    length: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      show: false
    }
  },

  componentDidMount: function () {
    var component = this
    window.setTimeout(function () { component.setState({ show: true }) }, 10)
  },

  render: function () {
    var x = this.props.length * Math.cos(this.props.angle)
    var y = this.props.length * Math.sin(this.props.angle)
    var classes = cx({
      'FootprintTip': true,
      'FootprintTip--topRight': x > 0 && y < 0,
      'FootprintTip--bottomRight': x > 0 && y > 0,
      'FootprintTip--bottomLeft': x < 0 && y > 0,
      'FootprintTip--topLeft': x < 0 && y < 0,
      'FootprintTip--show': this.state.show
    })

    return (
      <div className={classes}>
        <div className='FootprintTip__name'>{ this.props.metric.name }</div>
        <div className='FootprintTip__value'>{ this.props.metric.value }</div>
        <div className='FootprintTip__description'>{ this.props.metric.description }</div>
      </div>
    )
  }
})
