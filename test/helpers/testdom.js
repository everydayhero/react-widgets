'use strict'
// Via http://www.asbjornenge.com/wwc/testing_react_components.html
module.exports = (markup, options) => {
  if (typeof document !== 'undefined') return
  var jsdom = require('jsdom').jsdom
  global.document = jsdom(markup || '', options)
  global.window = document.defaultView
  global.navigator = {
    userAgent: 'node.js'
  }
  // ... add whatever browser globals your tests might need ...
}

