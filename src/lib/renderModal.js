import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

function renderModal (component, options) {
  let div = document.createElement('div')
  document.body.appendChild(div)

  options.onClose = function () {
    unmountComponentAtNode(div)
    document.body.removeChild(div)
  }

  render(React.createFactory(component)(options), div)
}

export default renderModal
