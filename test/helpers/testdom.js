'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom
// Via http://www.asbjornenge.com/wwc/testing_react_components.html
module.exports = function (markup) {
  if (typeof document !== 'undefined') return
  const dom = new JSDOM(markup || '')
  global.document = dom.window.document
  global.window = dom.window
  global.navigator = {
    userAgent: 'node.js'
  }
}
