import React from 'react'

export default React.createClass({
  displayName: 'Team',

  render: function () {
    return (
      <a href={this.props.pageUrl} target='_top' title={this.props.title} className='Team'>
        <div className='Team__skin'>
          <img src={this.props.imgSrc} alt={this.props.title} />
          <p>{ this.props.title }</p>
        </div>
      </a>
    )
  }
})
